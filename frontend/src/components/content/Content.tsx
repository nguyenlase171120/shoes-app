import React, { useContext } from "react";
import { ShoesApi } from "../../api/shoes/ShoesApi";
import RingLoader from "react-spinners/RingLoader";
import "./content.scss";
import { Card } from "../card/Card";
import { motion } from "framer-motion";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setStatusDelete } from "../../redux/slice/shoesSlice";
import { AuthContext } from "../../context/AuthContext";

interface shoesProps {
  shoesName: string;
  shoesPrice: number;
  shoesImage: string;
  _id: string;
}

interface IContentProps {
  length: number;
  listSearchProps: shoesProps[];
}

const Content: React.FC<IContentProps> = ({ length, listSearchProps }) => {
  const [listShoes, setListShoes] = React.useState<shoesProps[]>([]);
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();
  const statusDelete = useAppSelector((state) => state.shoesState.statusDelete);
  const dispatch = useAppDispatch();

  const checkLogin = useContext(AuthContext);

  React.useEffect(() => {
    const fetchData = async () => {
      const listShoes = await ShoesApi.getShoesByPagination(page);

      if (listShoes.data.length >= 0) {
        setListShoes(listShoes.data);
      }

      dispatch(setStatusDelete(false));
    };

    fetchData();
  }, [page, statusDelete === true]);

  const handlePageClick = (data: { selected: number }) => {
    const numberPage = data.selected + 1;
    setPage(numberPage);
  };

  return (
    <div className="content__container-main">
      <motion.div
        className="content__container"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 300,
        }}
      >
        {checkLogin && (
          <div
            className="content__add"
            onClick={() => navigate("/shoes/register")}
          >
            <MdOutlineAddCircleOutline className="content__icon" />
            <span>Add new shoe</span>
          </div>
        )}

        {listSearchProps[0].shoesName !== "" ? (
          listSearchProps.map((item, key) => {
            return (
              <Card
                shoesName={item.shoesName}
                shoesPrice={item.shoesPrice}
                shoesImage={item.shoesImage}
                shoesId={item._id}
                key={key}
              />
            );
          })
        ) : listShoes.length >= 0 ? (
          listShoes.map((item, key) => {
            return (
              <Card
                shoesName={item.shoesName}
                shoesPrice={item.shoesPrice}
                shoesImage={item.shoesImage}
                shoesId={item._id}
                key={key}
              />
            );
          })
        ) : (
          <RingLoader color={"#123abc"} loading={true} css="" size={40} />
        )}
      </motion.div>

      {listSearchProps[0].shoesName === "" && (
        <div className="context__pagination">
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            pageRangeDisplayed={5}
            pageCount={length}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName="content_pagination-links"
            activeClassName="content-active"
            pageClassName="content-page"
            previousClassName="page_button-previous"
            nextClassName="page_button-next"
          />
        </div>
      )}
    </div>
  );
};

export default Content;
