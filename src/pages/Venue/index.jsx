import React from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../constants/apiUrls";
import useApi from "../../hooks/useApi";

function Venue() {
  let { id } = useParams();
  const data = useApi(`${API_BASE_URL}${id}`);
  console.log(data);
  return (
    <div>
      <h1>This is venue</h1>
    </div>
  );
}

export default Venue;
