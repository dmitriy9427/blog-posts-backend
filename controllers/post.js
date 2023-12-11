import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const postsAll = await PostModel.find().populate("user").exec();
    res.json(postsAll);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось получить статьи.",
    });
  }
};

export const getOne = async (req, res) => {
  const postId = req.params.id;

  PostModel.findOneAndUpdate(
    {
      _id: postId,
    },
    {
      $inc: { viewsCount: 1 },
    },
    {
      returnDocument: "after",
    }
  )
    .populate("user")
    .then((update) => {
      return res.json(update);
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Не удалось получить статью.",
      });
    });
};

export const remove = async (req, res) => {
  const postId = req.params.id;
  PostModel.findByIdAndDelete({
    _id: postId,
  })
    .populate("user")
    .then((res) => {
      res.json({
        message: "Статья успешно удалена.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Не удалось удалить статью, попробуйте еще раз.",
      });
    });
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );
    res.json({
      message: "Статья успешно обновлена.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Невозможно обновить статью.",
    });
  }
};

export const create = async (req, res) => {
  try {
    const newPost = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Не удалось создать статью.",
    });
  }
};
