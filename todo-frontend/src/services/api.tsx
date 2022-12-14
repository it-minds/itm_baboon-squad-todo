export async function getData(url: string) {
  return await fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error('Problem with fetching');
    }
    return resp.json();
  });
}

export async function postData(url: string, data: any) {
  const a = JSON.stringify(data);
  return await fetch(url, {
    method: 'POST',
    body: a,
    headers: { 'Content-Type': 'application/json' },
  })
    .then((resp) => resp.json())
    .then((result) => {
      console.log('Success:', result);
      return result;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export async function putDataById(url: string, data: any) {
  return await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { accept: '*/*', 'Content-Type': 'application/json' },
  })
    .then((result) => {
      //console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

export async function deleteDataById(url: string) {
  return await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((resp) => resp.json())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
