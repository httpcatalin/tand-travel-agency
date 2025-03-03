//will be deleted and replaced with db data
import google from "@/public/icons/google.svg";
import photo1 from "@/public/images/review1.jpg";
import photo3 from "@/public/images/review3.jpg";
export const reviews = [
  {
    id: 1,
    link: "https://g.co/kgs/7sJte8H",
    describedComment:
      "Mulțumim echipei TAND Travel care au fost extrem de binevoitori, eficienti și ne-au propus exact ce ne doream pentru vacanță. Au fost mereu la legătura și ne-au dat cele mai bune recomandări, știind ca am mers prima data intr-o țara straina. La următoarea vacanta vom merge tot cu ei!",
    rate: 5,
    reviewer: {
      name: "Laura Andros",
      worksAs: "",
      worksAt: "Google",
      icon: google,
    },
    imgSrc:
      photo1,
  },
  {
    id: 2,
    link: "https://g.co/kgs/fxnnVW5",
    describedComment:
      "Mulțumim Tandtravel pentru vacanta !",
    rate: 5,
    reviewer: {
      name: "Liliana Cibuc",
      worksAs: "",
      worksAt: "Google",
      icon: google,
    },
    imgSrc:
      photo3,
  },
  {
    id: 3,
    link: "https://g.co/kgs/CeXbw2W",
    describedComment:
      "Great company to travel with ! Had a great experience two times in row, will choose them next year too !",
    rate: 5,
    reviewer: {
      name: "Anthony Grossu",
      worksAs: "",
      worksAt: "Google",
      icon: google,
    },
    imgSrc:
      "",  
  },
];
