export async function getData(url:string) {
    return await fetch(url).then((resp) => {
      if (!resp.ok) {
        throw Error("Problem with fetching");
      }
      return resp.json();
    });
  }