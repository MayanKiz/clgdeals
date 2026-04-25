export type Category = "Lab Gear" | "Electronics" | "Dorm Decor" | "Textbooks";
export type Condition = "New" | "Good" | "Used";

export type CampusItem = {
  id: string;
  title: string;
  price: number;
  category: Category;
  condition: Condition;
  dorm: string;
  seller: string;
  phone: string;
  description: string;
  image: string;
};

export const categories: Category[] = ["Lab Gear", "Electronics", "Dorm Decor", "Textbooks"];
export const conditions: Condition[] = ["New", "Good", "Used"];

export const campusItems: CampusItem[] = [
  {
    id: "lab-coat-kit",
    title: "Chem Lab Coat + Goggles",
    price: 18,
    category: "Lab Gear",
    condition: "Good",
    dorm: "Maple Hall",
    seller: "Aditi R.",
    phone: "15551234567",
    description: "Clean medium lab coat with anti-fog goggles. Perfect for general chemistry labs.",
    image: "https://images.unsplash.com/photo-1581093458791-9d2d5f9905d2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "graphing-calculator",
    title: "TI-84 Plus Calculator",
    price: 55,
    category: "Electronics",
    condition: "Used",
    dorm: "Cedar House",
    seller: "Marcus T.",
    phone: "15559876543",
    description: "Reliable graphing calculator with fresh batteries. Has light scratches but works perfectly.",
    image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "study-lamp",
    title: "Adjustable LED Desk Lamp",
    price: 24,
    category: "Dorm Decor",
    condition: "Good",
    dorm: "North Quad",
    seller: "Nora K.",
    phone: "15557654321",
    description: "Warm/cool LED lamp with USB charging port and flexible arm for late-night study sessions.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "econ-textbook",
    title: "Microeconomics 8th Edition",
    price: 32,
    category: "Textbooks",
    condition: "Good",
    dorm: "Pine Residency",
    seller: "Sam P.",
    phone: "15553456789",
    description: "Light highlighting in first chapters. Includes access code card unused.",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "mini-fridge",
    title: "Compact Mini Fridge",
    price: 70,
    category: "Dorm Decor",
    condition: "Used",
    dorm: "Elm Hostel",
    seller: "Jay M.",
    phone: "15552349876",
    description: "Energy-efficient 3.2 cu ft fridge. Pickup from Elm lobby after 5 PM.",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "noise-cancelling-headphones",
    title: "Noise Cancelling Headphones",
    price: 48,
    category: "Electronics",
    condition: "New",
    dorm: "Oak Towers",
    seller: "Lina S.",
    phone: "15558761234",
    description: "Sealed over-ear wireless headphones, great for library focus or commuting.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
];

export function getCampusItem(id: string) {
  return campusItems.find((item) => item.id === id);
}
