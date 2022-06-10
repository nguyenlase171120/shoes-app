import { FormEvent, useState } from "react";
import "./search.scss";
import { debounce } from "lodash";
import { useSearchParams } from "react-router-dom";

import { ShoesApi } from "../../api/shoes/ShoesApi";
import { useAppDispatch } from "../../redux/hook";
import { searchShoesReducer } from "../../redux/slice/shoesSlice";

interface ISearch {
  _id: string;
  shoesName: string;
  shoesPrice: number;
  shoesImage: string;
}

export default function Search() {
  const [status, setStatus] = useState(false);
  const [listSearch, setListSearch] = useState<ISearch[]>([]);
  const [txtSearch, setTxtSearch] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    const result = await ShoesApi.searchShoesName(txtSearch);
    dispatch(searchShoesReducer(result.data));

    // setSearchParams({ keyword: txtSearch });

    // const keySearch = searchParams.get("keyword");
    // console.log(keySearch);
  };

  const handleSearch = debounce(
    async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      // const keySearch = searchParams.get("keyword");
      setTxtSearch(e.target.value);

      if (e.target.value === "") {
        setStatus(false);
      }

      const result = await ShoesApi.searchShoesCharacters(e.target.value);

      if (result.data.length > 0) {
        setStatus(true);
        setListSearch(result.data);
      }
    },
    1000
  );

  return (
    <div className="content__search">
      <div>
        <input type="search" placeholder="search" onChange={handleSearch} />
        <button onClick={handleSubmit}>Search</button>
      </div>

      {status && (
        <div className="content_search-result">
          {listSearch.map((item, key) => {
            return (
              <div key={key} className="container__item-details">
                <img src={item.shoesImage} alt="images" />

                <div className="item-info">
                  <h5>{item.shoesName}</h5>
                  <p>{item.shoesPrice}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
