import Product from "../models/Product.model.js";
import { uploadOnCloudinary } from "../utils/cloudnary.js";



export const createProduct = async (req,res,next)=>{

    try {
        const { name, description, price, category, subcategory } = req.body;

        // Validate input
        if (!name || !description || !price || !category || !subcategory ) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const {role} = req.user;
        if(role!== "merchant"){
            return res.status(401).json({message:"You are not authorized to create a product"})
        }
        if(req.files && req.files.productImage){

            const productImageLocalPath = req.files.productImage[0].path;

            console.log(productImageLocalPath)
            const cloudNaryUrl = await uploadOnCloudinary(productImageLocalPath);
    
            var image = cloudNaryUrl.url;
     
           
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            subcategory,
            image:image || 'https://xelltechnology.com/wp-content/uploads/2022/04/dummy4.jpg',
            user: req.user._id, 
        });

        const createProduct = await Product.findById(product._id).populate('user');
        // Save the product to the database
        next();

        return res.status(201).json({sucess:true, message: 'Product created successfully.', createProduct });


    } catch (error) {
        console.error(error);
        return res.status(500).json({sucess:true,  message: 'Internal Server Error.' });
    }
}


export const editProduct = async (req,res)=>{

    try {
        const { name, description, price, category, subcategory } = req.body;

        if (!name || !description || !price || !category || !subcategory) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const {role} = req.user;
        if(role!== "merchant"){
            return res.status(401).json({message:"You are not authorized to edit product"})
        }

        if(req.files && req.files.productImage){

            const productImageLocalPath = req.files.productImage[0].path;

            console.log(productImageLocalPath)
            const cloudNaryUrl = await uploadOnCloudinary(productImageLocalPath);
    
            var image = cloudNaryUrl.url;
     
           
        }

        const product = await Product.findById(req.params.id);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({sucess:true,  message: 'Product not found.' });
        }

        product.name = name;
        product.description = description;
        product.price = price;
        product.category = category;
        product.subcategory = subcategory;
        product.image = image;

        await product.save();

        return res.json({sucess:true,  message: 'Product updated successfully.', product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({sucess:false,  message: 'Internal Server Error.' });
    }
}


export const getProduct =  async (req, res) => {
    try {
        // Fetch all products
        const products = await Product.find();
        return res.json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({sucess:false,  message: 'Internal Server Error.' });
    }
}


export const getProductsBySearch = async (req,res)=>{

    try {

         
        const category = req.query.category;

        const name = req.query.name;
       

        const sort = req.query.sort || "createdAt";
        const order = req.query.order || "desc";

        const products = await Product.find({
            name:{$regex:name,$options:'i'},
        }).sort({[sort]:order});


        // .sort({[sort]:order});

        return res.status(200).json({products})
        
    } catch (error) {

        res.json({sucess:false,error});

        
    }



}