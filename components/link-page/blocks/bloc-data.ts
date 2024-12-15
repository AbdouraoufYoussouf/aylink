import { BlocType } from "@/src/types/bloc-type";

const initialBlocs: BlocType[] = [
  {
    id: "1",
    name: "Bloc URL",
    subBlocs: [

      {
        id: "1-2",
        title: "Exemple de lien 2",
        description: "Documentation officielle de TypeScript.",
        type: "URL",
        url: "https://www.typescriptlang.org/",
        isPrivate: true,
        isPaid:false,
        price:50,
        isDisplay: false,
      },
    ],
  },


];

export default initialBlocs;
