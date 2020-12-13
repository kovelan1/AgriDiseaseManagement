import CreateDisease from "./CreateDisease";
import ViewDisease from "./ViewDisease";
import NotFound from "./NotFound";



const DiseaseRoutes = [
  {
    path: "/disease/create",
    component: CreateDisease,
   
  },
  {
    path: "/disease/listAll",
    component: ViewDisease,
    
  },
  {
    path: "/disease/404",
    component: NotFound,
    
  }
];

export default DiseaseRoutes;
