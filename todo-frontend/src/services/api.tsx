export async function getData(url:string) {
    return await fetch(url).then((resp) => {
      if (!resp.ok) {
        throw Error("Problem with fetching");
      }
      return resp.json();
    });
  }

  export async function postData(url:string, data:any) {
    return await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  export async function putDataById(url:string, data:any) {
    console.log(JSON.stringify(data))
    return await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  
  export async function deleteDataById(url:string, id:string) {
    return await fetch(url.concat(id), {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }