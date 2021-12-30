export default function fetcher(url: string) {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin'
  }).then((res) => res.json());
}
