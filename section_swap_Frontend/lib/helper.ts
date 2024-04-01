export const semesterList = [1, 2, 3, 4, 5, 6];

export const streamList = ["CSE", "CSSE", "CSCE", "IT"];

export const monthMap: any = {
  "1": "Jan",
  "2": "Feb",
  "3": "Mar",
  "4": "Apr",
  "5": "May",
  "6": "Jun",
  "7": "July",
  "8": "Aug",
  "9": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
};
//  export const convertDate=(d:string)=>{
//     // const p = blogs[0].createdAt;
//     console.log(d);
//     const date = new Date(d);
//     // console.log(date.getMonth());
//     return `${date.getDate()} ${monthMap[date.getMonth()+1]} ${date.getFullYear()} At ${date.getHours()>12?date.getHours()-12<10? `0${date.getHours()-12}`:date.getHours()-12:date.getHours()}:${date.getMinutes()<10?`0${date.getMinutes()}`:date.getMinutes()} ${date.getHours()>12?"PM":"AM"}`
//   }

import { formatDistanceToNow, parseISO } from "date-fns";

const monthMaps: Record<number, string> = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

export const convertDate = (d: string): string => {
  const date = parseISO(d);
  const now = new Date();

  const differenceInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (differenceInHours < 24) {
    return `${formatDistanceToNow(date).replace("about", " ")} ago`;
  } else if (differenceInHours < 48) {
    return "1 day ago";
  } else if (differenceInHours < 24 * 7) {
    const daysAgo = Math.floor(differenceInHours / 24);
    return `${daysAgo} days ago`;
  } else {
    // Use your existing date formatting logic if more than 1 week ago
    return `${date.getDate()} ${
      monthMaps[date.getMonth() + 1]
    } ${date.getFullYear()} At ${
      date.getHours() > 12
        ? date.getHours() - 12 < 10
          ? `0${date.getHours() - 12}`
          : date.getHours() - 12
        : date.getHours()
    }:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${
      date.getHours() > 12 ? "PM" : "AM"
    }`;
  }
};

export function convertDateToFormat(date = "2024-01-17") {
  const dateObj = new Date(date);
  const month = monthMap[dateObj.getMonth() + 1];
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${day} ${month} ${year}`;
}

export const DiscoverTypes = ["video", "audio", "ebook", "archive", "mobile"];

export const MoreNavigationComponents: {
  title: string;
  href: string;
  description: string;
  isPremium: boolean;
}[] = [
  {
    title: "SGPA Calculator",
    href: "/calculator",
    description:
      "Calculate your SGPA with this calculator. It is very easy to use and you can save your data for future use.",
    isPremium: false,
  },
  {
    title: "Faculty Details",
    href: "/kiitprofessor",
    description: "Get all the details of your faculty.",
    isPremium: true,
  },
  {
    title: "Faculty Review",
    href: "/faculty_reviews",
    description: "Review your faculty and help others to know about them.",
    isPremium: true,
  },
  {
    title: "Group Link",
    href: "/grouplink",
    description: "Get all the group links of your class.",
    isPremium: true,
  },
  {
    title: "Section Swapping",
    href: "/swapping",
    description: "Swap your section with others.",
    isPremium: true,
  },
  {
    title: "Blogs",
    href: "/blogs",
    description: "Get blogs",
    isPremium: false,
  },{
    
    title: "Kiit Social",
    href: "/kiitsocial",
    description: "Social media for kiitians",
    isPremium: false,
  },

];
