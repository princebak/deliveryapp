import { Briefcase, ListTask, People, Bullseye } from "react-bootstrap-icons";

export const ProjectsStats = [
  {
    id: 1,
    title: "Toutes les Livraisons",
    value: 132,
    icon: <Briefcase size={18} />,
    statInfo: '<span className="text-dark me-2"></span> Voir',
  },
  {
    id: 2,
    title: "Livraisons Finies",
    value: 32,
    icon: <ListTask size={18} />,
    statInfo: '<span className="text-dark me-2"></span> Voir',
  },
  {
    id: 3,
    title: "Livraisons en cours",
    value: 30,
    icon: <People size={18} />,
    statInfo: '<span className="text-dark me-2"></span> Voir',
  },
  {
    id: 4,
    title: "Livraisons en attente",
    value: 20,
    icon: <Bullseye size={18} />,
    statInfo: '<span className="text-dark me-2"></span> Voir',
  },
];
export default ProjectsStats;
