export const routeHandler = (req, res, _next) => {
  console.warn(`The requested URL ${ req.originalUrl } was not found on the server`);
  return res
    .status(404)
    .json({error: {
      message: `The requested URL ${ req.originalUrl } was not found on the server`
    }})
}