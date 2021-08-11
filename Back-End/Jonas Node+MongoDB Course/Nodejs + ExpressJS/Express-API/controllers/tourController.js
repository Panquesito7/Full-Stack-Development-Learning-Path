const fs = require('fs');
const path = require('path');
const tours = require(path.join(__dirname,'../dev-data/data/tours-simple.json'));

exports.checkId = (req, res, next, val) => {
  console.log(`Id requested is ${req.params.id}`)
  if (req.params.id >= tours.length) {
    return res.status(404).send({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
}

//================ Get all tours =========================
exports.getAllTours = (req, res) => {
  res.json({
    status: 'success',
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours
    }
  });
};

//================ Get Single tour =========================
exports.getSingleTour = (req, res) => {
  // console.log(req.params);

  const id = req.params.id * 1;

  //tours.find will return an object so we can access value using eg (tour.id)
  const tour = tours.find(ele => {
    return ele.id === id;
  });

  //tours.filter will return an array of oject (Although only one) so we can access value using eg (tour[0].id)
  // const tour = tours.filter(ele => {
  //  return ele.id === id;
  // });

  // if(id > tours.length){ //This is also one of the way to check invalid url
  // if (!tour) {
  //   res.status(404).send({
  //     status: 'fail',
  //     message: 'Invalid ID'
  //   });
  //   return;
  // }

  res.status(200).send({
    status: 'success',
    data: {
      tour
    }
  });
};

//================ Add a new tour =========================
exports.addNewTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    path.join(__dirname, '../dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );

  // res.send('Done'); //We cannout send the reponse twice.
};

//================ Update a tour =========================
exports.updateSingleTour = (req, res) => {
  const id = req.params.id * 1; //get the id from request

  const tour = tours.find(ele => {
    //Find the tour from the tours array
    return ele.id === id;
  });

  //404 Error handler
  // if (!tours) {
  //   res.status(404).send({
  //     status: 'fail',
  //     message: 'Invalid ID'
  //   });
  // }

  //201 Respose handler
  const updatedTour = Object.assign(tour, req.body); //Update the tour

  //Write the file with the update tour and send back the updated tour
  fs.writeFile(
    path.join(__dirname, './dev-data/data/tours-simple.json'),
    JSON.stringify(tours),
    err => {
      res.status(201).send({
        status: 'success',
        data: {
          updatedTour
        }
      });
    }
  );
};

//================ Delete a tour =========================
exports.deleteSingleTour = (req, res) => {
  const id = req.params.id * 1; //Took the id from request

  const tour = tours.find(ele => {
    //Finding the tour from the all the of tours
    return ele.id === id;
  });

  //Handling 404 error (If no tour found with the id)
  // if (!tour) {
  //   res.status(404).send({
  //     status: 'fail',
  //     message: 'Invalid ID'
  //   });
  // }

  //204 Status handler
  //I will take all the tours which don't match the 'tour.id' in a single array and then overwrite the json file with this new array.

  //Create a new array of tours excluding the tour which has to be deleted
  const toursAfterDeletion = tours.filter(ele => {
    return ele.id !== tour.id;
  });

  //Rewritting the file with the new tours array.
  fs.writeFile(
    path.join(__dirname, '../dev-data/data/tours-simple.json'),
    JSON.stringify(toursAfterDeletion),
    err => {
      res.status(204).send({
        status: 'success',
        data: null
      });
    }
  );
};