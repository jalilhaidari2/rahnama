var express = require("express");
var passport = require("passport");
var shope = require("../models/shope");
var router = express.Router({ mergeParams: true });
let upload = require("../config/dbconfig");
let isLoggedIn = require("../config/islogedin");




//#################   SHOPES  ###############
router.get("/", (req, res) => {

	//find all the shopes from database
	shope.find({}, (err, allShopes) => {
		if (err) {
			res.render("noitems");
		}
		else {
			res.render("shopes/shope", { allShopes: allShopes });
		}
	});
});
//     	SHOW ROUTE
router.get("/:id", function (req, res) {
	//find the home with the given id
	shope.findById(req.params.id, function (err, foundShop) {
		if (err) {
			console.log(err)
			res.render("noitems");
		}
		else {
			// send it to the show page
			res.render("shopes/show_shop", { foundShop: foundShop });
		}
	})
});
// new shope
router.get("/new", isLoggedIn, (req, res) => {
	res.render("forms/shope");
});

router.post("/new", isLoggedIn, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			console.log(err);
			res.redirect("/shopes");
		}
		else {
			shope.create(req.body.shope, (err, createdShope) => {
				if (err) {
					console.log(err);
					res.redirect("/shopes");
				}
				else {
					req.files.forEach((file) => {
						createdShope.images.push(file.filename);
					});
					createdShope.save();
				}
				res.redirect("/shopes");

			})

		}
	})
})



module.exports = router;

