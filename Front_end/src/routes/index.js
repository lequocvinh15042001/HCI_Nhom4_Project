import { NotBreadCrumb, AddressLayout, AdminLayout } from '~/layouts';
import {
    Home,
    PageNotFound,
    ProductDetail,
    Login,
    Register,
    Cart,
    Addresses,
    AddressForm,
    Orders,
    Checkout,
    Profile,
    Search,
    ResetPassword,
    SendOtp,
    CheckOtp,
    CheckOtpRegister,
    ChangePassword,
    NotifyOrder,
    Order,
} from '~/pages';
import {
    AdminOrder,
    AdminOrders,
    Categories,
    CategoryForm,
    Dashboard,
    LoginAdmin,
    ProductForm,
    Products,
    Reviews,
    Users,
} from '~/admin/pages';

const pathNames = {
    home: '/',
    product: '/product/:id',
    login: '/login',
    loginAdmin: '/admin/login',
    register: '/register',
    search: '/search',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    sendOtp: '/send-otp',
    checkOtp: '/check-otp',
    checkOtpRegister: '/check-otp-register',
    sales: '/sales',
    any: '/*',

    // private
    cart: '/cart',
    addresses: '/addresses',
    addressForm: '/address-form',
    orders: '/orders',
    order: '/order/:id',
    checkout: '/checkout',
    profile: '/profile',
    changePassword: '/change-password',
    notifyOrder: '/redirect/payment',

    //admin
    admin: 'admin/*',
    dashboardNotEndPoint: '',
    dashboard: 'dashboard',
    products: 'products',
    productFormAdd: 'product-form',
    productFormEdit: 'product-form/:id',
    categories: 'categories',
    categoryFormAdd: 'category-form',
    categoryFormEdit: 'category-form/:id',
    users: 'users',
    adminOrders: 'orders',
    orderDetail: 'order/:id',
    reviews: 'reviews',
};

const publicRoutes = [
    { path: pathNames.home, component: Home, layout: NotBreadCrumb },
    { path: pathNames.product, component: ProductDetail },
    { path: pathNames.login, component: Login },
    { path: pathNames.resetPassword, component: ResetPassword },
    { path: pathNames.sendOtp, component: SendOtp },
    { path: pathNames.checkOtp, component: CheckOtp },
    { path: pathNames.checkOtpRegister, component: CheckOtpRegister },
    {
        path: pathNames.loginAdmin,
        component: LoginAdmin,
        layout: null,
    },
    { path: pathNames.register, component: Register },
    { path: pathNames.search, component: Search },
    { path: pathNames.any, component: PageNotFound, layout: null },
];

// private
const privateRoutes = [
    { path: pathNames.cart, component: Cart },
    { path: pathNames.addresses, component: Addresses, layout: AddressLayout },
    {
        path: pathNames.addressForm,
        component: AddressForm,
        layout: AddressLayout,
    },
    { path: pathNames.orders, component: Orders },
    { path: pathNames.order, component: Order },
    { path: pathNames.checkout, component: Checkout, layout: null },
    { path: pathNames.profile, component: Profile },
    { path: pathNames.changePassword, component: ChangePassword },
    { path: pathNames.notifyOrder, component: NotifyOrder, layout: null },
];

// admin
const adminRoutes = [
    {
        path: pathNames.admin,
        component: PageNotFound,
        layout: null,
    },
    {
        path: pathNames.dashboardNotEndPoint,
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: pathNames.dashboard,
        component: Dashboard,
        layout: AdminLayout,
    },
    {
        path: pathNames.products,
        component: Products,
        layout: AdminLayout,
    },
    {
        path: pathNames.productFormAdd,
        component: ProductForm,
        layout: AdminLayout,
    },
    {
        path: pathNames.productFormEdit,
        component: ProductForm,
        layout: AdminLayout,
    },
    {
        path: pathNames.categories,
        component: Categories,
        layout: AdminLayout,
    },
    {
        path: pathNames.categoryFormAdd,
        component: CategoryForm,
        layout: AdminLayout,
    },
    {
        path: pathNames.categoryFormEdit,
        component: CategoryForm,
        layout: AdminLayout,
    },
    {
        path: pathNames.adminOrders,
        component: AdminOrders,
        layout: AdminLayout,
    },
    {
        path: pathNames.orderDetail,
        component: AdminOrder,
        layout: AdminLayout,
    },
    {
        path: pathNames.users,
        component: Users,
        layout: AdminLayout,
    },
    {
        path: pathNames.reviews,
        component: Reviews,
        layout: AdminLayout,
    },
];

export { publicRoutes, privateRoutes, adminRoutes, pathNames };
