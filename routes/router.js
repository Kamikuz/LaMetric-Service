const axios = require('axios').default;
module.exports = function(app) {
  app.get('/', function(req, res) {
    console.log(req.originalUrl);
    let result = {
      "frames": [
        {
          "index": 0,
          "text": 'Null',
          "icon": "29901"
        }
      ]
    }
    res.json(result)
  });

  app.get('/bilibili/live', function(req, res) {
    if(req.query.room_id){
      axios.get("https://api.live.bilibili.com/xlive/web-room/v1/index/getInfoByRoom",{
        params:{
          room_id: req.query.room_id,
          responseType: 'json'
        }
      }).then(function (response) {
        let result = {
          "frames": [
            {
              "index": 0,
              "text": response.data.data.room_info.online,
              "icon": "29901"
            }
          ]
        }
        res.json(result)
      })
        .catch(function () {
          res.status(404)
        })
    }else{
      let result = {
        "frames": [
          {
            "index": 0,
            "text": '请输入房间号!',
            "icon": "29901"
          }
        ]
      }
      res.status(200).send(result)
    }
  });

  app.get('/bilibili/follow', function(req, res) {
    if (req.query.vmid){
      axios.get("https://api.bilibili.com/x/relation/stat",{
        params:{
          vmid: req.query.vmid,
          responseType: 'json'
        }
      }).then(function (response) {
        let result = {
          "frames": [
            {
              "index": 0,
              "text": response.data.data.follower,
              "icon": "29901"
            }
          ]
        }
        res.status(200).send(result)
      })
        .catch(function () {
          res.status(404)
        })
    }else{
      let result = {
        "frames": [
          {
            "index": 0,
            "text": '请输入空间号!',
            "icon": "29901"
          }
        ]
      }
      res.status(200).send(result)
    }
  });

  app.get('/api/netease/*',function(req,res){
    axios.get('http://api.kamikuz.cn:3000/'+ req.params[0],{params: req.query})
          .then(function(response) {
            res.send(response.data);
          })
          .catch(e =>
            res.send('{code: 0}')
          )
  })

  app.get('/netease/follow', function(req, res) {
    if(req.query.uid){
      axios.get("http://api.kamikuz.cn:3000/user/detail",{
        params:{
          uid: req.query.uid,
          responseType: 'json'
        }
      }).then(function (response) {
        let result = {
          "frames": [
            {
              "index": 0,
              "text": response.data.profile.followeds,
              "icon": "29107"
            }
          ]
        }
        res.status(200).send(result)
      })
        .catch(function () {
          res.status(404)
        })
    }else{
      let result = {
        "frames": [
          {
            "index": 0,
            "text": '请输入个人id!',
            "icon": "29107"
          }
        ]
      }
      res.status(404).send(result)
    }
  });

  app.get('/netease/radio', function(req, res) {
    if(req.query.rid){
      axios.get("http://api.kamikuz.cn:3000/dj/detail",{
        params:{
          rid: req.query.rid,
          responseType: 'json'
        }
      }).then(function (response) {
        let result = {
          "frames": [
            {
              "index": 0,
              "text": response.data.djRadio.subCount,
              "icon": "29107"
            }
          ]
        }
        res.json(result)
      })
        .catch(function () {
          res.status(404)
        })
    }else{
      let result = {
        "frames": [
          {
            "index": 0,
            "text": '请输入电台id!',
            "icon": "29107"
          }
        ]
      }
      res.status(200).send(result)
    }
  });

  app.get('*', function(req, res) {
    let result = {
      "frames": [
        {
          "index": 0,
          "text": 'Null',
          "icon": "29901"
        }
      ]
    }
    res.status(404).send(result)
  });
}
