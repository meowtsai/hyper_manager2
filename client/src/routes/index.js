import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

import { isUserAuthenticated, getLoggedInUser } from "../helpers/authUtils";

// lazy load all the views

// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const ForgetPassword = React.lazy(() => import("../pages/auth/ForgetPassword"));
const Confirm = React.lazy(() => import("../pages/auth/Confirm"));
// dashboard
const EcommerceDashboard = React.lazy(() =>
  import("../pages/dashboards/Ecommerce")
);
const CRMDashboard = React.lazy(() => import("../pages/dashboards/CRM"));
//*add new
const AdminDashboard = React.lazy(() => import("../pages/dashboards/Admin"));
// apps
const CalendarApp = React.lazy(() => import("../pages/apps/Calendar"));
const Projects = React.lazy(() => import("../pages/apps/Projects"));
const ProjectDetail = React.lazy(() => import("../pages/apps/ProjectDetail"));
// - ecommece pages
const EcommerceProducts = React.lazy(() =>
  import("../pages/apps/Ecommerce/Products")
);
const ProductDetails = React.lazy(() =>
  import("../pages/apps/Ecommerce/ProductDetails")
);
const Orders = React.lazy(() => import("../pages/apps/Ecommerce/Orders"));
const OrderDetails = React.lazy(() =>
  import("../pages/apps/Ecommerce/OrderDetails")
);
const Customers = React.lazy(() => import("../pages/apps/Ecommerce/Customers"));
const Cart = React.lazy(() => import("../pages/apps/Ecommerce/Cart"));
const Checkout = React.lazy(() => import("../pages/apps/Ecommerce/Checkout/"));
const Sellers = React.lazy(() => import("../pages/apps/Ecommerce/Sellers"));
// - kanban
const Kanban = React.lazy(() => import("../pages/apps/Kanban/"));

// - email
const Inbox = React.lazy(() => import("../pages/apps/Email/Inbox"));
const EmailDetail = React.lazy(() => import("../pages/apps/Email/Detail"));

// pages
const Starter = React.lazy(() => import("../pages/Starter"));
const Profile = React.lazy(() => import("../pages/profile"));
const ErrorPageNotFound = React.lazy(() =>
  import("../pages/error/PageNotFound")
);
const ServerError = React.lazy(() => import("../pages/error/ServerError"));
const ErrorForbidden = React.lazy(() =>
  import("../pages/error/ErrorForbidden")
);

// - other
const Invoice = React.lazy(() => import("../pages/other/Invoice"));
const FAQ = React.lazy(() => import("../pages/other/FAQ"));
const Pricing = React.lazy(() => import("../pages/other/Pricing"));

// uikit
const Cards = React.lazy(() => import("../pages/uikit/Cards"));
const Buttons = React.lazy(() => import("../pages/uikit/Buttons"));
const Modals = React.lazy(() => import("../pages/uikit/Modals"));
const Tabs = React.lazy(() => import("../pages/uikit/Tabs"));
const Notifications = React.lazy(() => import("../pages/uikit/Notifications"));
const Grid = React.lazy(() => import("../pages/uikit/Grid"));
const General = React.lazy(() => import("../pages/uikit/General"));
const Typography = React.lazy(() => import("../pages/uikit/Typography"));
const Icons = React.lazy(() => import("../pages/uikit/Icons"));
const Spinners = React.lazy(() => import("../pages/uikit/Spinners"));
const Widgets = React.lazy(() => import("../pages/uikit/Widgets"));
// forms
const BasicForms = React.lazy(() => import("../pages/forms/Basic"));
const FormValidation = React.lazy(() => import("../pages/forms/Validation"));
const FormAdvanced = React.lazy(() => import("../pages/forms/Advanced"));
const FormWizard = React.lazy(() => import("../pages/forms/Wizard"));
const FileUpload = React.lazy(() => import("../pages/forms/FileUpload"));
const Editors = React.lazy(() => import("../pages/forms/Editors"));
// charts
const ApexChart = React.lazy(() => import("../pages/charts/Apex"));
const BriteChart = React.lazy(() => import("../pages/charts/Brite"));
const ChartJs = React.lazy(() => import("../pages/charts/ChartJs"));
// tables
const BasicTables = React.lazy(() => import("../pages/tables/Basic"));
const AdvancedTables = React.lazy(() => import("../pages/tables/Advanced"));
const TestTable = React.lazy(() => import("../pages/tables/TestTable"));

// maps
const GoogleMaps = React.lazy(() => import("../pages/GoogleMaps"));

//platform
const ModifyPassword = React.lazy(() =>
  import("../pages/platform/ModifyPassword")
);

const PresetMessageHome = React.lazy(() =>
  import("../pages/platform/preset_messages/index")
);

const UserLogsHome = React.lazy(() => import("../pages/platform/logs/index"));

//offline cs
const CplCaseHome = React.lazy(() =>
  import("../pages/offline/cpl_case/CplCaseHome")
);
const CplCaseForm = React.lazy(() =>
  import("../pages/offline/cpl_case/CplCaseForm")
);

const CplCaseView = React.lazy(() =>
  import("../pages/offline/cpl_case/CplCaseView")
);

const GovLetterHome = React.lazy(() =>
  import("../pages/offline/gov_letter/GovLetterHome")
);
const PersonalVisitHome = React.lazy(() =>
  import("../pages/offline/personal_visit/PersonalVisitHome")
);
const PersonalVisitForm = React.lazy(() =>
  import("../pages/offline/personal_visit/PersonalVisitForm")
);

const GovLetterForm = React.lazy(() =>
  import("../pages/offline/gov_letter/GovLetterForm")
);

//service

const ServiceOverview = React.lazy(() =>
  import("../pages/service/questions/overview")
);
const ServiceStatistics = React.lazy(() =>
  import("../pages/service/statistics")
);

const ServiceStatisticsByHour = React.lazy(() =>
  import("../pages/service/statistics/ServiceStatisticsByHour")
);

const QuestionsQueryHome = React.lazy(() =>
  import("../pages/service/questions/query/QueryHome")
);

const AllocateListPage = React.lazy(() => import("../pages/service/allocate"));
const QuesionsListPage = React.lazy(() => import("../pages/service/questions"));
const SingleQuestionPage = React.lazy(() =>
  import("../pages/service/questions/view")
);

const TestPage = React.lazy(() =>
  import("../pages/service/questions/TestPage")
);

const BatchListPage = React.lazy(() => import("../pages/service/batch"));
const BatchTaskView = React.lazy(() =>
  import("../pages/service/batch/BatchTaskView")
);

//vip
const WhaleUserHome = React.lazy(() =>
  import("../pages/vip/whale_users/WhaleUserHome")
);

const DaddyListHome = React.lazy(() =>
  import("../pages/vip/daddy/DaddyListHome")
);

///vip/user_dashboard/${gameId}?
const WhaleUserDashboard = React.lazy(() =>
  import("../pages/vip/whale_users/UserDashboard")
);

const VipDashboardHome = React.lazy(() =>
  import("../pages/vip/dashboard/VipDashboardHome")
);

const RequestReportHome = React.lazy(() =>
  import("../pages/vip/whale_users/RequestReportHome")
);

const VipOfferHome = React.lazy(() => import("../pages/vip/offers/index"));
const VipOfferForm = React.lazy(() => import("../pages/vip/offers/form"));
const VipOrdersHome = React.lazy(() =>
  import("../pages/vip/offers/VipOrdersHome")
);
const VipOrdersForm = React.lazy(() =>
  import("../pages/vip/offers/VipOrdersForm")
);

//

const VIpUploadTaskHome = React.lazy(() =>
  import("../pages/vip/uploadTask/VIpUploadTaskHome")
);

const testProgressbar = React.lazy(() =>
  import("../pages/vip/uploadTask/testProgressbar")
);
//Games
const GamesHome = React.lazy(() => import("../pages/games"));
const GamesEditForm = React.lazy(() => import("../pages/games/form"));
const ServerHome = React.lazy(() => import("../pages/games/ServerHome"));

//event

const SerialRecordsHome = React.lazy(() =>
  import("../pages/events/SerialRecordsHome")
);

// handle auth and authorization

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isUserAuthenticated()) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{ pathname: "/account/login", state: { from: props.location } }}
          />
        );
      }

      const loggedInUser = getLoggedInUser();
      // check if route is restricted by role
      if (roles && roles.indexOf(loggedInUser.role) === -1) {
        // role not authorised so redirect to home page
        return <Redirect to={{ pathname: "/" }} />;
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
);

// root routes
const rootRoute = {
  path: "/",
  exact: true,
  component: () => <Redirect to="/dashboard/service" />,
  route: PrivateRoute,
};

// dashboards
const myDashboardRoutes = {
  path: "/mydashboard",
  name: "我的",
  icon: "dripicons-meter",
  header: "Navigation",
  children: [
    {
      path: "/mydashboard/ecommerce",
      name: "Ecommerce",
      badge: {
        variant: "success",
        text: "3",
      },
      component: EcommerceDashboard,
      route: PrivateRoute,
    },
    {
      path: "/mydashboard/crm",
      name: "CRM",
      component: CRMDashboard,
      route: PrivateRoute,
    },
  ],
};
//official dashboards
const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboard",
  icon: "dripicons-meter",
  header: "Navigation",
  children: [
    {
      path: "/dashboard/service",
      name: "客服相關",
      component: AdminDashboard,
      route: PrivateRoute,
    },
  ],
};
// apps
const appRoutes = {
  path: "/apps",
  name: "Apps",
  icon: "dripicons-view-apps",
  children: [
    {
      path: "/apps/calendar",
      name: "Calendar",
      component: CalendarApp,
      route: PrivateRoute,
    },
    {
      path: "/apps/projects",
      name: "Projects",
      children: [
        {
          path: "/apps/projects/list",
          name: "List",
          component: Projects,
          route: PrivateRoute,
        },
        {
          path: "/apps/projects/detail",
          name: "Detail",
          component: ProjectDetail,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/apps/ecommerce",
      name: "eCommerce",
      children: [
        {
          path: "/apps/ecommerce/products",
          name: "Products",
          component: EcommerceProducts,
          route: PrivateRoute,
        },
        {
          path: "/apps/ecommerce/details",
          name: "Product Details",
          component: ProductDetails,
          route: PrivateRoute,
        },
        {
          path: "/apps/ecommerce/orders",
          name: "Orders",
          component: Orders,
          route: PrivateRoute,
        },
        {
          path: "/apps/ecommerce/order/details",
          name: "Order Details",
          component: OrderDetails,
          route: PrivateRoute,
        },
        {
          path: "/apps/ecommerce/customers",
          name: "Customers",
          component: Customers,
          route: PrivateRoute,
        },
        {
          path: "/apps/ecommerce/shopping-cart",
          name: "Shopping Cart",
          component: Cart,
          route: PrivateRoute,
        },
        {
          path: "/apps/ecommerce/checkout",
          name: "Checkout",
          component: Checkout,
          route: PrivateRoute,
        },
        {
          path: "/apps/ecommerce/sellers",
          name: "Sellers",
          component: Sellers,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/apps/kanban",
      name: "Kanban",
      component: Kanban,
      route: PrivateRoute,
    },
    {
      path: "/apps/email",
      name: "Email",
      children: [
        {
          path: "/apps/email/inbox",
          name: "Inbox",
          component: Inbox,
          route: PrivateRoute,
        },
        {
          path: "/apps/email/details",
          name: "Email Details",
          component: EmailDetail,
          route: PrivateRoute,
        },
      ],
    },
  ],
};

// pages
const pageRoutes = {
  path: "/pages",
  name: "Pages",
  icon: "dripicons-copy",
  children: [
    {
      path: "/pages/starter",
      name: "Starter",
      component: Starter,
      route: PrivateRoute,
    },
    {
      path: "/pages/profile",
      name: "Profile",
      component: Profile,
      route: PrivateRoute,
    },
    {
      path: "/pages/invoice",
      name: "Invoice",
      component: Invoice,
      route: PrivateRoute,
    },
    {
      path: "/pages/faq",
      name: "FAQ",
      component: FAQ,
      route: PrivateRoute,
    },
    {
      path: "/pages/pricing",
      name: "Pricing",
      component: Pricing,
      route: PrivateRoute,
    },
    {
      path: "/pages/error-403",
      name: "Error - 403",
      component: ErrorForbidden,
      route: PrivateRoute,
    },
    {
      path: "/pages/error-404",
      name: "Error - 404",
      component: ErrorPageNotFound,
      route: PrivateRoute,
    },
    {
      path: "/pages/error-500",
      name: "Error - 500",
      component: ServerError,
      route: PrivateRoute,
    },
  ],
};

// auth
const authRoutes = {
  path: "/account",
  name: "Auth",
  children: [
    {
      path: "/account/login",
      name: "Login",
      component: Login,
      route: Route,
    },
    {
      path: "/account/logout",
      name: "Logout",
      component: Logout,
      route: Route,
    },
    {
      path: "/account/register",
      name: "Register",
      component: Register,
      route: Route,
    },
    {
      path: "/account/confirm",
      name: "Confirm",
      component: Confirm,
      route: Route,
    },
    {
      path: "/account/forget-password",
      name: "Forget Password",
      component: ForgetPassword,
      route: Route,
    },
  ],
};

// ui
const uiRoutes = {
  path: "/ui",
  name: "UI Kit",
  icon: "dripicons-briefcase",
  children: [
    {
      path: "/ui/buttons",
      name: "Buttons",
      component: Buttons,
      route: PrivateRoute,
    },
    {
      path: "/ui/cards",
      name: "Cards",
      component: Cards,
      route: PrivateRoute,
    },
    {
      path: "/ui/general",
      name: "General",
      component: General,
      route: PrivateRoute,
    },
    {
      path: "/ui/grid",
      name: "Grid",
      component: Grid,
      route: PrivateRoute,
    },
    {
      path: "/ui/icons",
      name: "Icons",
      component: Icons,
      route: PrivateRoute,
    },
    {
      path: "/ui/modals",
      name: "Modals",
      component: Modals,
      route: PrivateRoute,
    },
    {
      path: "/ui/notifications",
      name: "Notifications",
      component: Notifications,
      route: PrivateRoute,
    },
    {
      path: "/ui/spinners",
      name: "Spinners",
      component: Spinners,
      route: PrivateRoute,
    },
    {
      path: "/ui/tabs",
      name: "Tabs",
      component: Tabs,
      route: PrivateRoute,
    },
    {
      path: "/ui/typography",
      name: "Typography",
      component: Typography,
      route: PrivateRoute,
    },
    {
      path: "/ui/widgets",
      name: "Widgets",
      component: Widgets,
      route: PrivateRoute,
    },
  ],
};

// forms
const formsRoutes = {
  path: "/forms",
  name: "Forms",
  icon: "dripicons-document",
  children: [
    {
      path: "/forms/basic",
      name: "Basic Elements",
      component: BasicForms,
      route: PrivateRoute,
    },
    {
      path: "/forms/advanced",
      name: "Form Advanced",
      component: FormAdvanced,
      route: PrivateRoute,
    },
    {
      path: "/forms/validation",
      name: "Form validation",
      component: FormValidation,
      route: PrivateRoute,
    },
    {
      path: "/forms/wizard",
      name: "Form Wizard",
      component: FormWizard,
      route: PrivateRoute,
    },
    {
      path: "/forms/upload",
      name: "File Upload",
      component: FileUpload,
      route: PrivateRoute,
    },
    {
      path: "/forms/editors",
      name: "Editors",
      component: Editors,
      route: PrivateRoute,
    },
  ],
};

// other features
const featuresRoutes = {
  path: "/features",
  name: "Features",
  icon: "dripicons-view-list-large",
  children: [
    {
      path: "/features/charts",
      name: "Charts",
      children: [
        {
          path: "/features/charts/apex",
          name: "Apex",
          component: ApexChart,
          route: PrivateRoute,
        },
        {
          path: "/features/charts/brite",
          name: "Brite",
          component: BriteChart,
          route: PrivateRoute,
        },
        {
          path: "/features/charts/chartjs",
          name: "Chartjs",
          component: ChartJs,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/features/tables",
      name: "Tables",
      children: [
        {
          path: "/features/tables/basic",
          name: "Basic",
          component: BasicTables,
          route: PrivateRoute,
        },
        {
          path: "/features/tables/advanced",
          name: "Advanced",
          component: AdvancedTables,
          route: PrivateRoute,
        },
        {
          path: "/features/tables/testtable",
          name: "測試表格",
          component: TestTable,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/features/googlemaps",
      name: "Google Maps",
      component: GoogleMaps,
      route: PrivateRoute,
    },
  ],
};

const platformRoutesSub = {
  path: "/platform",
  name: "Platform",
  children: [
    {
      path: "/platform/modify_password",
      name: "修改密碼",
      component: ModifyPassword,
      route: PrivateRoute,
    },
    {
      path: "/platform/preset_messages",
      name: "自訂快速回覆",
      component: PresetMessageHome,
      route: PrivateRoute,
    },
    {
      path: "/platform/action_history",
      name: "後台操作紀錄",
      component: UserLogsHome,
      route: PrivateRoute,
    },
  ],
};
// online cs

const serviceRoutesSub = {
  path: "/service",
  name: "Service",
  children: [
    {
      path: "/service/view/:question_id",
      name: "客服案件檢視",
      component: SingleQuestionPage,
      route: PrivateRoute,
    },
    {
      path: "/service/batch_handler/:record_id",
      name: "批次處理-項目檢視",
      component: BatchTaskView,
      route: PrivateRoute,
    },
  ],
};
const serviceRoutes = {
  path: "/service",
  name: "客服",
  icon: " dripicons-device-desktop",
  children: [
    {
      exact: true,
      path: "/service/overview",
      name: "總覽",
      component: ServiceOverview,
      route: PrivateRoute,
    },
    {
      exact: true,
      path: "/service/questions/todo",
      name: "待處理案件",
      component: QuesionsListPage,
      route: PrivateRoute,
    },
    {
      path: "/service/questions/get_list",
      name: "等待中案件",
      component: QuesionsListPage,
      route: PrivateRoute,
    },
    {
      path: "/service/questions/closed",
      name: "近期結案案件",
      component: QuesionsListPage,
      route: PrivateRoute,
    },
    {
      path: "/service/questions/hidden",
      name: "隱藏案件",
      component: QuesionsListPage,
      route: PrivateRoute,
    },
    {
      path: "/service/questions/favorite",
      name: "我收藏的案件",
      icon: "dripicons-star",
      component: QuesionsListPage,
      route: PrivateRoute,
    },
    {
      exact: true,
      path: "/service/allocate/list",
      name: "派單系統- 案件列表",
      component: AllocateListPage,
      route: PrivateRoute,
    },
    {
      exact: true,
      path: "/service/statistics",
      name: "件數統計",
      component: ServiceStatistics,
      route: PrivateRoute,
    },
    {
      exact: true,
      path: "/service/pivot_tbl",
      name: "時間別統計",
      component: ServiceStatisticsByHour,
      route: PrivateRoute,
    },

    {
      exact: true,
      path: "/service/questions/query",
      name: "案件查詢",
      icon: "dripicons-search",
      component: QuestionsQueryHome,
      route: PrivateRoute,
    },
    {
      exact: true,
      path: "/service/batch_list",
      name: "批次處理",
      icon: "dripicons-basket",
      component: BatchListPage,
      route: PrivateRoute,
    },
  ],
};
// offline cs
const offlineRoutes = {
  path: "/offline",
  name: "線下客服區",
  icon: "dripicons-briefcase",
  children: [
    {
      path: "/offline/cpl_case/home",
      name: "消保",
      component: CplCaseHome,
      route: PrivateRoute,
    },
    {
      path: "/offline/gov_letter/home",
      name: "公函",
      component: GovLetterHome,
      route: PrivateRoute,
    },
    {
      path: "/offline/personal_visit/home",
      name: "親訪",
      component: PersonalVisitHome,
      route: PrivateRoute,
    },
  ],
};
const offlineRoutesSub = {
  path: "/offline",
  name: "offlineCS",
  children: [
    {
      path: "/offline/personal_visit/create",
      name: "新增親訪紀錄",
      component: PersonalVisitForm,
      route: PrivateRoute,
    },
    {
      path: "/offline/personal_visit/edit/:record_id",
      name: "編輯親訪紀錄",
      component: PersonalVisitForm,
      route: PrivateRoute,
    },
    {
      path: "/offline/gov_letter/create",
      name: "新增公函",
      component: GovLetterForm,
      route: PrivateRoute,
    },
    {
      path: "/offline/gov_letter/edit/:record_id",
      name: "編輯公函",
      component: GovLetterForm,
      route: PrivateRoute,
    },
    {
      path: "/offline/cpl_case/create",
      name: "新增消保紀錄",
      component: CplCaseForm,
      route: PrivateRoute,
    },
    {
      path: "/offline/cpl_case/edit/:record_id",
      name: "編輯消保紀錄",
      component: CplCaseForm,
      route: PrivateRoute,
    },
    {
      path: "/offline/cpl_case/view/:record_id",
      name: "檢視消保紀錄",
      component: CplCaseView,
      route: PrivateRoute,
    },
    {
      path: "/test",
      name: "測試",
      component: TestPage,
      route: PrivateRoute,
    },
  ],
};

// VIP
const vipRoutes = {
  path: "/vip",
  name: "VIP",
  icon: "dripicons-trophy",
  children: [
    {
      path: "/vip/dashboard",
      name: "總覽",
      component: VipDashboardHome,
      route: PrivateRoute,
    },

    {
      path: "/vip/whale_users",
      name: "鯨魚用戶",
      component: WhaleUserHome,
      route: PrivateRoute,
    },
    {
      path: "/vip/requests_report",
      name: "鯨魚用戶服務紀錄",
      component: RequestReportHome,
      route: PrivateRoute,
    },

    {
      path: "/vip/wire_report/list",
      name: "VIP 訂單",
      component: VipOrdersHome,
      route: PrivateRoute,
    },
    {
      path: "/vip/offers",
      name: "VIP方案",
      children: [
        {
          path: "/vip/offers/offer_list",
          name: "方案列表",
          component: VipOfferHome,
          route: PrivateRoute,
        },
        {
          path: "/vip/offers/form/create",
          name: "新增方案",
          component: VipOfferForm,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/vip/daddy",
      name: "VIP儲值服務用戶",
      component: DaddyListHome,
      route: PrivateRoute,
    },
    {
      path: "/vip/upload",
      name: "鯨魚用戶名單上傳",
      component: VIpUploadTaskHome,
      route: PrivateRoute,
    },
    {
      path: "/vip/test-progress",
      name: "測試",
      component: testProgressbar,
      route: PrivateRoute,
    },
  ],
};
//games

const gamesRoutes = {
  path: "/games",
  name: "遊戲管理",
  icon: "dripicons-archive",
  children: [
    {
      path: "/games/home",
      name: "遊戲設定",
      component: GamesHome,
      route: PrivateRoute,
      exact: true,
    },
    {
      path: "/games/create",
      name: "新增遊戲",
      component: GamesEditForm,
      route: PrivateRoute,
    },
    {
      path: "/games/servers",
      name: "伺服器設定",
      component: ServerHome,
      route: PrivateRoute,
      exact: true,
    },
  ],
};

//events

const eventsRoutes = {
  path: "/events",
  name: "活動",
  icon: "dripicons-broadcast",
  children: [
    {
      path: "/events/serial",
      name: "虛寶活動",
      component: SerialRecordsHome,
      route: PrivateRoute,
      exact: true,
    },
  ],
};
// online cs

const gameRoutesSub = {
  path: "/games",
  name: "games",
  children: [
    {
      path: "/games/edit/:game_id",
      name: "編輯遊戲",
      component: GamesEditForm,
      route: PrivateRoute,
    },
  ],
};

const vipRoutesSub = {
  path: "/vip",
  name: "VIP",
  children: [
    {
      path: "/vip/wire_report/edit/:report_id",
      name: "編輯vip訂單",
      component: VipOrdersForm,
      route: PrivateRoute,
    },
    {
      path: "/vip/user_dashboard/:game_id",
      name: "維護鯨魚用戶資料",
      component: WhaleUserDashboard,
      route: PrivateRoute,
    },
    {
      path: "/vip/offers/form/:product_id",
      name: "編輯方案",
      component: VipOfferForm,
      route: PrivateRoute,
    },
  ],
};

// flatten the list of all nested routes
const flattenRoutes = (routes) => {
  let flatRoutes = [];

  routes = routes || [];
  routes.forEach((item) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const allRoutes = [
  rootRoute,
  dashboardRoutes,
  appRoutes,
  authRoutes,
  pageRoutes,
  uiRoutes,
  formsRoutes,
  featuresRoutes,
  platformRoutesSub,
  offlineRoutes,
  offlineRoutesSub,
  myDashboardRoutes,
  serviceRoutes,
  serviceRoutesSub,
  vipRoutes,
  gamesRoutes,
  gameRoutesSub,
  vipRoutesSub,
  eventsRoutes,
];

//所有要在leftSideBar顯示的路徑
const loggedInUser = getLoggedInUser();
const authProtectedRoutes =
  loggedInUser !== null && loggedInUser.uid === 112
    ? [
        dashboardRoutes,
        appRoutes,
        pageRoutes,
        uiRoutes,
        formsRoutes,
        featuresRoutes,
        offlineRoutes,
        myDashboardRoutes,
        serviceRoutes,
        vipRoutes,
        gamesRoutes,
        eventsRoutes,
      ]
    : [
        dashboardRoutes,
        offlineRoutes,
        serviceRoutes,
        vipRoutes,
        gamesRoutes,
        eventsRoutes,
      ];

const allFlattenRoutes = flattenRoutes(allRoutes);

export { allRoutes, authProtectedRoutes, allFlattenRoutes };
