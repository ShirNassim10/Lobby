var request = require('request');

const getCitiesByCountries = async (req, res) => {
    console.log(req.params.country)
    try {
        const cities = await getCitiesFromApi(req.params.country);
        res.status(200).send(cities)
    } catch (error) {
        res.status(400).json({"error":error})
    }

}
//קריאה לשרת שנותן את כל הערים לפי מדינות, 
// עשיתי דרך הbackכי קוראים מhttד k http
getCitiesFromApi = (countryName) => {
    const options = {
        url: `http://api.geonames.org/searchJSON?username=ksuhiyp&country=${countryName}&maxRows=1000&style=SHORT`,
        method: "GET",
        //json: { } -for post method
    };
    return new Promise((resolve, reject) => {
        request(options, (error, res, body) => {
            if (error) {
                console.log("error:" + error);
                reject(error);
            }
            // console.log(body);
            console.log("ok");
            resolve(body);
        });
    });
}
module.exports = { getCitiesByCountries }


