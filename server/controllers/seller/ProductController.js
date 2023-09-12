import SellerProduct from "../../models/seller/SellerProduct.js";
import cloudinary from 'cloudinary'
import { AsyncError } from "../../middleware/AsyncError.js";
import Seller from "../../models/seller/seller.js";
import ErrorHandler from "../../utility/errorHandlerClass.js";
import Notification from "../../models/seller/notification.js";
import IncomeExpenses from "../../models/seller/income-expenses.js";
class ProductController {
    static createProduct = AsyncError(async (req, res) => {
        let seller = await Seller.findById(req.seller)
        let images = [];
        let imagesLink = [];
        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        for (let i = 0; i < images.length; i++) {
            const uploader = await cloudinary.v2.uploader.upload(images[i], {
                folder: `${seller.firstName}-products`,
            });

            imagesLink.push({
                public_id: uploader.public_id,
                url: uploader.secure_url,
            });
        }
        req.body.images = imagesLink;
        req.body.seller = seller._id;
        req.body.otherFields = JSON.parse(req.body.otherFields)
        req.body.brand=seller.companyName
        const product = await SellerProduct.create(req.body);

        res.status(201).json({ success: true, message: "Product created successfully." });
    });


    static getAllProducts = AsyncError(async (req, res, next) => {
        const products = await SellerProduct.find({ seller: req.seller })

        res.status(200).json({ success: true, products, })
    })

    static getSingleProduct = AsyncError(async (req, res, next) => {
        const product = await SellerProduct.findById(req.params.id)
        if (!product) return next(new ErrorHandler(404, "Product not found."))
        res.status(200).json({ success: true, product })
    })


    static updateProduct = AsyncError(async (req, res, next) => {
        const seller = await Seller.findById(req.seller)
        let product = await SellerProduct.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler(404, "Product not found."));
        }



        let images = [];
        let imgLinks = [];

        if (typeof req.body.images === "string" && req.body.images !== "") {
            images.push(req.body.images);
            for (let i = 0; i < product.images.length; i++) {
                await cloudinary.v2.uploader.destroy(product.images[i].public_id);
            }
        } else {
            if (req.body.images?.length > 0) {
                images = req.body.images;
                for (let i = 0; i < product.images.length; i++) {
                    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
                }
            }

        }

        for (let i = 0; i < images?.length; i++) {
            const uploader = await cloudinary.v2.uploader.upload(images[i], {
                folder: `${seller.firstName}-products`,
            });

            imgLinks.push({
                public_id: uploader.public_id,
                url: uploader.secure_url,
            });
        }

        req.body.images = imgLinks?.length > 0 ? imgLinks : product?.images;
        req.body.otherFields = JSON.parse(req.body.otherFields)

        product = await SellerProduct.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({ success: true, message: "Product updated successfully." });
    });


    static deleteProduct = AsyncError(async (req, res, next) => {
        const product = await SellerProduct.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler(404, "Product not found."));
        }

        // await Product.remove({ _id: req.params.id });
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        await SellerProduct.deleteOne({ _id: req.params.id });
        res
            .status(200)
            .json({ success: true, message: "Product deleted successfully." });
    });


    static updateProductStock = AsyncError(async (req, res, next) => {
        const product = await SellerProduct.findById(req.params.id);
        const { stock } = req.body;
        if (!product) {
            return next(new ErrorHandler(404, "Product not found."));
        }
        if (!stock) {
            return next(new ErrorHandler(404, "Stock is required."));
        }
        product.Stock += Number(stock);
        await product.save();
        res
            .status(200)
            .json({ success: true, message: "Product Stock update Successfully." });
    });


    static deleteReview = AsyncError(async (req, res, next) => {
        const product = await SellerProduct.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler(404, "Product not found."));
        }
        const reviews = product.reviews.filter(
            (item) => item._id.toString() !== req.query.id
        );

        let avg = 0;
        reviews.forEach((element) => (avg += element.rating));
        let ratings = 0;

        if (reviews.length === 0) {
            ratings = 0;
        } else {
            ratings = avg / reviews.length;
        }
        const numOfReviews = reviews.length;

        await SellerProduct.findByIdAndUpdate(req.params.id, {
            ratings,
            numOfReviews,
            reviews,
        });

        res
            .status(200)
            .json({ success: true, message: "Review deleted successfully." });
    });


    static productReview = AsyncError(async (req, res, next) => {
        const { rating, comment, productId } = req.body;

        let review = {
            name: req.user.name,
            user: req.user._id,
            comment,
            rating: Number(rating),
        };

        let product = await SellerProduct.findById(productId);
        if (!product) {
            return next(
                new ErrorHandler(404, `Product not found with this id : ${productId}`)
            );
        }

        const isReviewed = product.reviews.find(
            (item) => item.user.toString() === req.user._id.toString()
        );

        if (isReviewed) {
            product.reviews.forEach((element) => {
                if (element.user.toString() === req.user._id.toString()) {
                    element.comment = comment;
                    element.rating = rating;
                }
            });
        } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }
        let avg = 0;
        product.reviews.forEach((element) => {
            avg = avg + element.rating;
        });

        product.ratings = avg / product.reviews.length;

        await product.save();

        res.status(200).json({ success: true, message: "Reviewed" });
    });

    // Get All Reviews of a product

    static getAllReviews = AsyncError(async (req, res, next) => {
        const product = await SellerProduct.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler(404, "Product not found."));
        }
        res.status(200).json({ success: true, reviews: product.reviews });
    });

    static getAllNotification = AsyncError(async (req, res, next) => {
        const { startDate, endDate } = req.query;
        let query = { seller: req.seller };

        // Check if startDate and endDate are provided
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate), // Greater than or equal to startDate
                $lte: new Date(endDate),   // Less than or equal to endDate
            };
        } else if (startDate) {
            query.createdAt = new Date(startDate);
        }

        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 });
        const unreadCount = await Notification.countDocuments({ read: false, seller: req.seller });

        res.status(200).json({ success: true, notifications, unreadCount });
    });

    static updateNotificationStatus = AsyncError(async (req, res) => {
        let notification = await Notification.findById(req.params.id)
        notification.read = true
        await notification.save()
        res.status(200).json({ success: true })
    })



    static calculateProduct = AsyncError(async (req, res) => {
        const totalProducts = await SellerProduct.countDocuments({ seller: req.seller });

        res.status(200).json({
            success: true,
            totalProducts,
        });
    });
    static overAllIncomeExpense = AsyncError(async (req, res) => {
        const incExp = await IncomeExpenses.findOne({ seller: req.seller })
        res.status(200).json({ success: true, incExp })
    })

    static countStockInOut = AsyncError(async (req, res) => {
        const inStockCount = await SellerProduct.countDocuments({
            Stock: { $gt: 0 },
            seller: req.seller,
        });

        const outOfStockCount = await SellerProduct.countDocuments({
            Stock: { $eq: 0 },
            seller: req.seller,
        });
        res.status(200).json({ success: true, inStockCount, outOfStockCount })
    })






    static yearWiseIncomeExpense = AsyncError(async (req, res) => {
        const { year } = req.query;
        const sellerId = req.seller // Assuming the seller is logged in



        // Use the aggregation framework to group data by month and calculate sums for each month
        const incomeExpensesData = await IncomeExpenses.aggregate([
            {
                $match: {
                    seller: sellerId,
                    timestamp: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`),
                    },
                },
            },
            {
                $group: {
                    _id: { $month: '$timestamp' }, // Group by month
                    income: { $sum: '$income' },
                    expenses: { $sum: '$expenses' },
                },
            },
        ]);

        // Initialize an array to hold data for all 12 months
        const monthlyData = Array.from({ length: 12 }, (_, index) => {
            const month = index + 1;
            const matchingEntry = incomeExpensesData.find((entry) => entry._id === month);
            return {
                month,
                income: matchingEntry ? matchingEntry.income : 0,
                expenses: matchingEntry ? matchingEntry.expenses : 0,
            };
        });

        const monthlyRevenueData = monthlyData.map((entry) => ({
            ...entry,
            revenue: entry.income - entry.expenses,
        }));

        res.status(200).json({ success: true, yearIncExp: monthlyData, yearRevenue: monthlyRevenueData });
    })



    static deleteReview = AsyncError(async (req, res, next) => {
        const product = await SellerProduct.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler(404, "Product not found."));
        }
        const reviews = product.reviews.filter(
            (item) => item._id.toString() !== req.query.id
        );

        let avg = 0;
        reviews.forEach((element) => (avg += element.rating));
        let ratings = 0;

        if (reviews.length === 0) {
            ratings = 0;
        } else {
            ratings = avg / reviews.length;
        }
        const numOfReviews = reviews.length;

        await SellerProduct.findByIdAndUpdate(req.params.id, {
            ratings,
            numOfReviews,
            reviews,
        });

        res
            .status(200)
            .json({ success: true, message: "Review deleted successfully." });
    });


    static getAllReviews = AsyncError(async (req, res, next) => {
        const product = await SellerProduct.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler(404, "Product not found."));
        }
        res.status(200).json({ success: true, reviews: product.reviews });
    });




}
export default ProductController