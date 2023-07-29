const fetchData = async (category) => {
  try {
    const res = await fetch(`http://localhost:5000/products?category=${category}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const CategoriesPage = ({CategoriesParts}) => {
    console.log(CategoriesParts);
    return (
        <div>
            <h1>This is Categories Page</h1>
        </div>
    );
};

export default CategoriesPage;

export async function getStaticProps(context) {
  const { category } = context.params;
  const CategoriesParts = await fetchData(category);

  return {
    props: {
      CategoriesParts,
    },
  };
}