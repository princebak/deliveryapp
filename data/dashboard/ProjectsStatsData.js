import { Briefcase, ListTask, People, Bullseye } from "react-bootstrap-icons";

export const ProjectsStats = [
  {
    id: 1,
    title: "Toutes les Livraisons",
    value: "...",
    icon: <Briefcase size={18} />,
    statInfo: '<span className="text-dark me-2"></span> Total',
  },
  {
    id: 2,
    title: "Livraisons Finies",
    value: "...",
    icon: <ListTask size={18} />,
    statInfo: '<span className="text-dark me-2"></span> Total',
  },
  {
    id: 3,
    title: "Livraisons en cours",
    value: "...",
    icon: <People size={18} />,
    statInfo: '<span className="text-dark me-2"></span> Total',
  },
  {
    id: 4,
    title: "Livraisons en attente",
    value: "...",
    icon: <Bullseye size={18} />,
    statInfo: '<span className="text-dark me-2"></span> Total',
  },
];
export default ProjectsStats;
