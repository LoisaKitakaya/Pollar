import axios from "axios";

const url = "http://127.0.0.1:8000/candidates/upload_avatar/";

const ImageForm = ({ candidateData }) => {
  const handleSubmit = (data) => {
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    window.location.reload(false);
  };

  return (
    <div>
      <form
        className="px-4"
        encType="multipart/form-data"
        onSubmit={(e) => {
          e.preventDefault();

          const data = {
            id: candidateData.id,
            image: e.target.image.files[0],
          };

          handleSubmit(data);
        }}
      >
        <label htmlFor="firstname" className="block mb-4">
          <span className="text-gray-700">
            Change candidate avatar
            <span className="text-red-700 text-3xl">*</span>
          </span>
          <input
            type="file"
            name="image"
            required
            className="mt-1 block w-full rounded-md shadow-sm bg-gray-200 border-gray-300 focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 focus:ring focus:bg-gray-100"
          />
        </label>
        <br />
        <button
          type="submit"
          className="rounded-md shadow py-3 px-4 w-full border-gray-300 bg-green-600 hover:bg-green-900 hover:text-white mb-4"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default ImageForm;
