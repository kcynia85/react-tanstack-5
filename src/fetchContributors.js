import axios from "axios";

const fetchContributors = async (perPage) => {
  const params = new URLSearchParams({ per_page: perPage });

  const res = await axios.get(
    `https://api.github.com/repos/tannerlinsley/react-query/contributors?${params}`
  );
  return res.data;
};

export default fetchContributors;
