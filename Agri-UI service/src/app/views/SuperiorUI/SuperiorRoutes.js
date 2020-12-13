
import NotFound from "./NotFound";
import ViewUsers from "./ViewUsers"
import { authRoles } from "../../auth/authRoles";
const SuperiorRoutes = [

  
  {
    path: "/superiro/userview",
    component: ViewUsers,
    
  },
  {
    path: "/record/404",
    component: NotFound,
    
  }
];

export default SuperiorRoutes;
