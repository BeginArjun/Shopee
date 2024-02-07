
interface AppState{
    cart : Cart 
    favourite : Favourite
    order:Order
}

interface Cart{
    id:string 
    qty:number
    productId:string
    product:string 
    price:number
    display_images:string
    caption:string
}

interface User{
    id:string 
    name:string
    email:string
    phoneNo:string
    address?:string
}

interface Review{
    id:string 
    rating:number
    review?:string
    userId:string
    user:User
    productId:string
    product:Product
    createdAt:Date
}

interface Product{
    id:string 
    product:string 
    price:number
    display_images:string
    description:string
    caption:string
    reviews:Review[]
}

interface OrderItems{
    id:string
    quantity:number
    product:Product
    productId:string
    display_images:string 
    price:number
}

interface Order{
    id:string
    user:User
    orderItems:OrderItems[]
    totalAmount:number
    status:"Pending" | "Completed"
    paymentStatus:"Pending" | "Completed"
    paymentMode:"COD"
    createdAt:Date
}

interface Favourite{
    id:string
    product:Product
    productId:string
}