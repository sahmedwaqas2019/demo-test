const express = require('express')
var path = require('path');
const app = express();
const port = 3000;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//setup public folder
app.use(express.static('./public'));
app.get('/',function (req, res) {
    res.render('pages/demo')
    });
    app.get('/ajax',function (req, res) {
        let data = [];
        console.log(req.query);
        let pageId = req.query.page;
        if(pageId == 0){
            pageId = 1;
        }
        let limit = 3;
        let maximum = parseInt(pageId) * limit;
        if(maximum > 6){
            maximum = 6;
        }
        let minimum = 1;
        if(pageId > 1){
            minimum = (maximum - limit) + 1; 
        }
        for(let i=minimum; i<=maximum;i++){
            data.push({
                item:'Item '+req.query.option+i
            });
        }
        res.json({data:data,current_page:pageId,option:req.query.option});
        });
app.listen(port, () => console.log(`MasterEJS app Started on port ${port}!`));