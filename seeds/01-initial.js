exports.seed = function(knex) {
    return knex('users').truncate()
      .then(function () {
        return knex('users').insert([
          {id: 1, username: 'Samwise', password: '1234'},
          {id: 2, username: 'Pippin', password: '1234'},
          {id: 3, username: 'Merry', password: '1234'}
        ]);
      });
  };
  