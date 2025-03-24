
import HomepageLayout from "../components/Layout/HompageLayout";
import LoginRegister from "../pages/auth/LoginRegister";
import Recommend from "../pages/userUI/Recommend";
import ChooseMenu from "../pages/userUI/ChooseMenu";
import Home from "../pages/userUI/Home";
import Introduce from "../pages/userUI/Introduce";
import NutritionAndHealth from "../pages/userUI/NutritionAndHealth";
import NewsDetails from "../pages/userUI/NutritionAndHealth/NewsDetail";
import InfoAccount from "../pages/userUI/InfoAccount";


export const settingRoutes = [
    { path: "/", compoent: Home, layout: HomepageLayout },
    { path: "/form", compoent: LoginRegister, layout: HomepageLayout },
    { path: "/theo-doi-suc-khoe-cua-me", compoent: Introduce, layout: HomepageLayout },
    { path: "/ngan-hang-thuc-don-dinh-duong", compoent: ChooseMenu, layout: HomepageLayout },
    { path: "/ngan-hang-thuc-don-dinh-duong/:id", compoent: ChooseMenu, layout: HomepageLayout },
    { path: "/nhu-cau-dinh-duong-khuyen-nghi", compoent: Recommend, layout: HomepageLayout },
    { path: "/dinh-duong-va-suc-khoe-cho-me", compoent: NutritionAndHealth, layout: HomepageLayout },
    { path: "/dinh-duong-va-suc-khoe-cho-me/:id", compoent: NewsDetails, layout: HomepageLayout },
    { path: "/thong-tin-tai-khoan", compoent: InfoAccount, layout: HomepageLayout },
]
