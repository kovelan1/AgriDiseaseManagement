import CreateRecord from "./CreateRecord";
import ViewOfficerRecord from "./ViewOfficerRecord";
import NotFound from "./NotFound";
import ResponceReq from "./ResponceReq"
import { authRoles } from "../../auth/authRoles";
import ViewFarmersRecord from "./ViewFarmersRecord";
import DiseaseDashbord from "./DiseaseDashbord";
import SetUpLocation from "./SetUpLocation";

const RecordRoutes = [
  {
    path: "/record/create",
    component: CreateRecord,
   
  },
  {
    path: "/record/dashbord",
    component: DiseaseDashbord,
   
  },
  {
    path: "/setup/location",
    component: SetUpLocation,
   
  },
  {
    path: "/record/officerview",
    component: ViewOfficerRecord,
    auth: authRoles.admin
  },
  {
    path: "/record/farmerview",
    component: ViewFarmersRecord,
    auth: authRoles.farmer
  },
  {
    path: "/record/responce",
    component: ResponceReq,
    auth: authRoles.admin
  },
  {
    path: "/record/404",
    component: NotFound,
    
  }
];

export default RecordRoutes;
