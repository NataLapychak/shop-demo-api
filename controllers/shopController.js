// Тестові дані
const categories = [
  { id: "1", slug: "beauty", name: "Beauty" },
  { id: "2", slug: "fragrances", name: "Fragrances" },
  { id: "3", slug: "groceries", name: "Groceries" },
];

export const getCategories = (req, res) => {
  res.status(200).json(categories);
};
