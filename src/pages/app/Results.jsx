import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Charts from "../../components/Charts";
import PageTitle from "../../pageTitle";

const GET_POLL_RESULTS = gql`
  query ($pollId: String!) {
    results(pollId: $pollId) {
      name
      image
      totalVotes
    }
  }
`;

const Results = () => {
  PageTitle("Results");
  const id = useParams();

  const { loading, error, data } = useQuery(GET_POLL_RESULTS, {
    variables: { pollId: id.id },
  });

  if (data) {
    console.log(data);
    console.log("Data fetched successfully.");
  }
  if (loading) return "Fetching...";
  if (error) return `Fetching error! ${error.message}`;

  const sampleData = data.results;

  const chartData = [];

  sampleData.map((candidate) => {
    return chartData.push({
      name: candidate.name,
      total: candidate.totalVotes,
    });
  });

  return (
    <div className="h-full py-4 px-20 bg-zinc-100 min-h-screen">
      <h1 className="text-2xl text-center mb-4">Poll results</h1>
      <hr className="border-1 mx-20 border-zinc-400 mb-8" />
      <div className="flex justify-evenly items-center">
        <div>
          {sampleData.map((candidate, index) => {
            const list = (
              <div
                className="rounded-md shadow-md my-4 mx-2 p-3 flex items-center bg-white"
                key={index}
              >
                <img src={candidate.image} className="w-16" alt="avatar" />
                <div className="ml-4">
                  <p className="text-xl">
                    {candidate.name}:{" "}
                    <span className="text-red-600 px-2 py-1 rounded-lg bg-zinc-200 border">
                      {candidate.totalVotes}
                    </span>{" "}
                    total votes
                  </p>
                </div>
              </div>
            );

            return list;
          })}
        </div>
        <div className="w-2/5">
          <Charts chartData={chartData} />
        </div>
      </div>
      <div className="flex w-fit mx-auto mt-28 items-center">
        <svg
          viewBox="0 0 600 595"
          xmlns="http://www.w3.org/2000/svg"
          class="sc-fzppip kyDLla w-16"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M342.277 9.4l195.971 87.165C575.801 113.268 600 150.515 600 191.616v211.961c0 41.1-24.199 78.348-61.752 95.051l-195.971 87.165a104.029 104.029 0 01-84.554 0L61.752 498.628C24.199 481.925 0 444.678 0 403.578V191.615c0-41.1 24.199-78.348 61.752-95.05L257.723 9.4a104.029 104.029 0 0184.554 0z"
              fill="#202020"
            ></path>
            <path
              d="M332.269 43.303a79.877 79.877 0 00-64.741 0L76.38 128.036c-24.842 11.012-40.858 35.632-40.858 62.805v213.702c0 27.174 16.016 51.793 40.858 62.805l191.148 84.734a79.877 79.877 0 0064.74 0l191.148-84.734c24.842-11.012 40.859-35.631 40.859-62.805V190.841c0-27.173-16.017-51.793-40.859-62.805L332.27 43.303z"
              stroke="#FF684F"
              class="inner-ring"
              stroke-width="24.247"
              opacity=".499"
            ></path>
            <path
              d="M337.399 20.368a92.026 92.026 0 00-74.798 0l-195.97 87.165c-33.221 14.775-54.628 47.725-54.628 84.083v211.961c0 36.358 21.407 69.308 54.627 84.084l195.971 87.164a92.026 92.026 0 0074.798 0l195.97-87.164c33.221-14.776 54.628-47.726 54.628-84.084v-211.96c0-36.359-21.407-69.309-54.627-84.084L337.399 20.368z"
              stroke="#FF684F"
              class="outer-ring"
              stroke-width="24.007"
            ></path>
            <text
              font-family="Helvetica-Bold, Helvetica"
              font-size="51"
              font-weight="bold"
              letter-spacing="2"
              fill="#FF684F"
              transform="translate(0 -10)"
            >
              <tspan x="181" y="459">
                VICTORY
              </tspan>
            </text>
            <path
              fill="#FF684F"
              d="M223.963 151h21.98l58.319 213H282.28z"
            ></path>
            <path
              fill="#E04126"
              d="M362.13 233.44H340L304.263 364h21.973z"
            ></path>
            <path
              fill="#FF684F"
              d="M401.607 169.473h-21.904l-26.201 95.357h21.814z"
            ></path>
            <path
              d="M201.981 151h21.982l58.317 213a28.809 28.809 0 01-27.786-21.201L201.981 151z"
              fill="#E04126"
            ></path>
            <path
              d="M245.944 151a28.809 28.809 0 0127.786 21.201L326.243 364h-21.981l-58.318-213z"
              fill="#FF9877"
            ></path>
            <path
              d="M223.963 151l5.068 18.473h-24.595A25.079 25.079 0 01180.243 151h43.72z"
              fill="#FF684F"
            ></path>
            <path
              d="M409.967 203.367c8.993-6.29 11.19-18.675 4.911-27.675l-18.836-26.996-30.789 14.49c-9.982 4.698-14.266 16.599-9.568 26.581l.01.021 33.724-15.872 20.548 29.45z"
              fill="#FF684F"
              fill-rule="nonzero"
            ></path>
          </g>
        </svg>
        <p className="text-xl ml-4">
          Powered by{" "}
          <a
            href="https://formidable.com/open-source/victory/"
            className="text-red-600 hover:text-red-400"
          >
            Victory charts
          </a>
        </p>
      </div>
    </div>
  );
};

export default Results;
