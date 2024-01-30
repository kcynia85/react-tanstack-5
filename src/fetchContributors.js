import axios from "axios";

const fetchContributors = async (perPage) => {
  const searchParams = new URLSearchParams({ per_page: perPage }).toString();
  const url = `https://api.github.com/repos/tannerlinsley/react-query/contributors?${searchParams}`;
  const response = await axios.get(url);
  return response.data;
};

export default fetchContributors;
