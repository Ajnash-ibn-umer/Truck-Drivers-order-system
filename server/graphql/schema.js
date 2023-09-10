export default `
type Admin{
  username: String,
  email: String,
  password: String,
  
}
type DrivingLicense{
name: String,
LicenseNumber: String,
validFrom: String,
validTo: String
}
input DrivingLicenseInput{
  name: String,
  LicenseNumber: String,
  validFrom: String,
  validTo: String
  }
input ImageInput{
    imageName:  String,
    imageUrl:  String
}
type Image{
  imageName:  String,
  imageUrl:  String
}
type TruckDriver{
  _id: ID,
  name: String,
  mobileNumber: String,
  address : String,
  createdAt: String,
  drivingLicense:DrivingLicense
}
type Vendor{
  _id:ID,
  name: String,
  mobileNumber:String,
  address:String,
  location: String,
  email: String,
  createdAt: String

}
type Product{
  _id:ID,
  productName:String,
  price: Float,
  category: String,
  image:Image
  createdAt: String,

}
type OrderProduct {
  productName: String
  price: Float
  quantity: Float
  productId: Product
}
input OrderProductInput {
  productName: String
  price: Float
  quantity: Float
  productId: ID
}
type Order {
  _id:ID
  products: [OrderProduct]
  totalAmount: Float
  collectedAmount: Float
  truckDriver: TruckDriver
  vendor: Vendor
  createdAt: String!
}

type GeneralResponse{
  success: Boolean,
  msg: String
}
type TokenResponse{
  success: Boolean,
  msg: String,
  token: String
}
type readTruckDriversResponse{
  success: Boolean,
  msg: String,
  truckDrivers: [TruckDriver]
}
type readTruckDriverByIdResponse{
  success: Boolean,
  msg: String,
  truckDriver: TruckDriver
}
type readVendorResponse{
  success: Boolean,
  msg: String,
  vendors: [Vendor]
}
type readVendorByIdResponse{
  success: Boolean,
  msg: String,
  vendor: Vendor
}
type readProductResponse{
  success: Boolean,
  msg: String,
  products: [Product]
}
type readOrderResponse{
  success: Boolean,
  msg: String,
  orders: [Order]
}
type readProductByIdResponse{
  success: Boolean,
  msg: String,
  product: Product
}
  type Query {
    adminLogin(
      email: String,
      password: String
    ):TokenResponse
    truckDriverLogin(
      mobileNumber: String,
      password: String
    ):TokenResponse


    readTruckDrivers(
      pageNumber: Int,
      limit: Int
    ):readTruckDriversResponse
    readTruckDriverById(id:ID):readTruckDriverByIdResponse



    readVendors(
      pageNumber: Int,
      limit: Int
    ):readVendorResponse
    readVendorById(id:ID):readVendorByIdResponse

    readProducts(
      pageNumber: Int,
      limit: Int  
    ):readProductResponse
    readProductById(id:ID):readProductByIdResponse

    readOrders(
      pageNumber: Int,
      limit: Int  
    ):readOrderResponse
  }
  type Mutation{

    adminRegister(
      username: String,
      email: String,
      password: String
      confirmPassword: String
    ):GeneralResponse





    createTruckDriver(
      name: String,
      mobileNumber: String,
      address: String
      drivingLicense: DrivingLicenseInput
      password: String
    ):GeneralResponse

    updateTruckDriver(
      id:ID
      name: String,
      mobileNumber: String,
      address: String
      drivingLicense: DrivingLicenseInput
      password: String
    ):GeneralResponse

    deleteTruckDriverById(id:ID):GeneralResponse





    createVendor(
      name: String,
      mobileNumber:String,
      address:String,
      location: String,
      email: String,
    ):GeneralResponse

    updateVendor(
      id:ID
      name: String,
      mobileNumber:String,
      address:String,
      location: String,
      email: String,
    ):GeneralResponse

    deleteVendorById(id:ID):GeneralResponse






    createProduct(
      productName:String,
      price: Float,
      category: String,
      image:ImageInput
    ):GeneralResponse

    updateProduct(
      id:ID
      productName:String,
      price: Float,
      category: String,
      image:ImageInput
      createdAt: String,
    ):GeneralResponse

    deleteProductById(id:ID):GeneralResponse




    createOrder(
      products: [OrderProductInput]
      totalAmount: Float
      collectedAmount: Float
      truckDriver: ID
      vendor: ID
    ):GeneralResponse

  }
  
  `;
