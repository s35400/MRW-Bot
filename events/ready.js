
module.exports = client => {

    console.log(`Connected as ${client.user.tag}`)


    client.user.setActivity('Your nations :)', {
        type: 'WATCHING'
    });



}