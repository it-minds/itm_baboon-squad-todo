export async function getData(url) {
    return await fetch(url).then((resp) => {
      if (!resp.ok) {
        throw Error("Problem with fetching");
      }
      return resp.json();
    });
  }