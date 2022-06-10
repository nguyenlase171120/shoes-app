import React from "react";
import { ShoesApi } from "../../api/shoes/ShoesApi";
import Content from "../../components/content/Content";
import Header from "../../components/header/Header";
import { useAppSelector } from "../../redux/hook";

const Home = () => {
  const [lengthPage, setLengthPage] = React.useState<number>(1);
  const [page, setPage] = React.useState<number>(1);

  React.useEffect(() => {
    const fetchData = async () => {
      const listShoes = await ShoesApi.getAllShoes();
      const numberLength = Math.ceil(listShoes.data.length / 6);
      setLengthPage(numberLength);
    };

    fetchData();
  }, []);

  const listSearch = useAppSelector((state) => state.shoesState.shoesSearch);

  return (
    <div>
      <header>
        <Header />
      </header>

      <section>
        <Content length={lengthPage} listSearchProps={listSearch} />
      </section>
    </div>
  );
};

export default Home;
