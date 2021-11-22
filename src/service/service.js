const getData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    alert("fetch error");
  }
  return await res.json();
};
const postData = async (url,data) =>{
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json();
}
export { getData, postData };
