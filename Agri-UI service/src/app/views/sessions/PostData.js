import qs from 'qs';

export default function PostData(type, userData) {

    return new Promise((resolve, reject) => {

        fetch(type, {
            method: 'POST',
            auth: {
                username: "web",
                password: "pin"
            },
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                'Authorization': 'Basic bW9iaWxlOnBpbg==',
                
            },
            data: qs.stringify(userData)
        })
            .then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                resolve(responseJson);
            })
            
            
    });
}
