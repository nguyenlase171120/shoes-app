const shoesModel = require('../model/shoesModel');

const shoesController = {
  addNewShoes: async (req, res) => {
    try {
      const { name, price, image } = req.body;

      const result = await shoesModel.findOne({ shoesName: name });

      if (!result) {
        const newShoes = new shoesModel({
          shoesName: name,
          shoesPrice: price,
          shoesImage: image,
        });

        const save = newShoes.save();

        if (save) {
          res.status(200).json({
            status: true,
            message: 'Create new shoes success',
            data: newShoes,
          });
        } else {
          res.status(400).json({ status: false, message: 'Cant create shoes' });
        }
      } else {
        res
          .status(400)
          .json({ status: false, message: 'Bad request of shoes name' });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  //Get all
  getAllShoes: async (req, res) => {
    try {
      const listShoes = await shoesModel.find();

      if (listShoes) {
        return res.status(200).json({
          status: true,
          message: 'Get all shoes success',
          data: listShoes,
        });
      } else {
        res.status(400).json({ status: true, message: 'Cant get all shoes' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ status: false, message: error.message });
    }
  },

  //Get shoes of page
  getShoesByPagination: async (req, res) => {
    try {
      const { page } = req.query || 1;
      const perPage = 6;

      const listShoesByPage = await shoesModel
        .find()
        .skip(perPage * page - perPage)
        .limit(perPage);

      const listAllShoes = await shoesModel.find();
      const numberShoes = listAllShoes.length / 6;
      const numberAll = Math.ceil(numberShoes);

      res.status(200).json({
        status: true,
        data: listShoesByPage,
        message: 'Get data by page successfully',
        numberAll,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: 'error' });
    }
  },
  //delete shoes by id
  deleteShoes: async (req, res) => {
    try {
      const { id } = req.query;

      const result = await shoesModel.findOneAndDelete({ _id: id });

      if (result) {
        res
          .status(200)
          .json({ status: false, message: 'Delete shoes successfully' });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  //Get shoes by id
  getShoesById: async (req, res) => {
    try {
      const { id } = req.query;
      const shoes = await shoesModel.find({ _id: id });

      if (shoes) {
        res.status(200).json({
          status: true,
          message: 'get shoes successfully',
          data: shoes,
        });
      } else {
        res.status(404).json({ status: false, message: 'Cant found id' });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  //Update shoes by id
  updateShoesById: async (req, res) => {
    try {
      const { id, shoesName, shoesPrice, shoesImage } = req.body;

      shoesModel.findByIdAndUpdate(
        id,
        {
          shoesName,
          shoesPrice,
          shoesImage,
        },
        (err, docs) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json({
              status: true,
              message: 'update shoes successfully',
            });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  //Search by text
  searchByCharacters: async (req, res) => {
    try {
      const txtSearch = req.params.txtSearch;

      const resultSearch = await shoesModel
        .find({
          shoesName: { $regex: txtSearch },
        })
        .limit(5);

      res.status(200).json({ status: true, data: resultSearch });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  searchByName: async (req, res) => {
    try {
      const { keyword } = req.query;
      console.log(keyword);

      const resultSearch = await shoesModel.find({
        shoesName: { $regex: keyword },
      });

      res.status(200).json({ status: true, data: resultSearch });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },
};

module.exports = shoesController;
