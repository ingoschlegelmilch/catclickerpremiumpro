//Model
var model = {
    adminMode: false,
    activeCat: null,
    cats: [
        {
            name: "meow1",
            url: "https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426",
            count: 0
        },
        {
            name: "meow2",
            url: "https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496",
            count: 0
        },
        {
            name: "meow3",
            url: "https://lh5.ggpht.com/LfjkdmOKkGLvCt-VuRlWGjAjXqTBrPjRsokTNKBtCh8IFPRetGaXIpTQGE2e7ZCUaG2azKNkz38KkbM_emA=s0#w=640&h=454",
            count: 0
        },
        {
            name: "meow4",
            url: "https://lh4.ggpht.com/dUJNejPqb_qLsV1kfWcvviqc7adxsw02BSAm8YLWNklP4lI6fQCLKXd-28uKuchtjoEUpqFN0K6kkTSDHw=s0#w=588&h=640",
            count: 0
        },
        {
            name: "meow5",
            url: "https://lh3.ggpht.com/cesD31eroFxIZ4IEeXPAJkx_8i5-haU3P9LQosGNfV-GfAPUh2bE4iw4zV6Mc9XobWOR70BQh2JAP57wZlM=s0#w=640&h=480",
            count: 0
        }
    ]
};

//Octopus
var octopus = {
    
    init: function() {
        model.activeCat = model.cats[0];
        catListView.init();
        catView.init();
        adminView.init();
    },

    getActiveCat: function() {
        return model.activeCat; 
    },

    getCats: function() {
        return model.cats;
    },

    setActiveCat: function(cat) {
        model.activeCat = cat;
    },

    increase: function() {
        model.activeCat.count++;
        catView.render();
    },

    getAdminState: function() {
        return model.adminMode;
    },

    toggleAdmin: function() {
        switch(model.adminMode) {
            case false:
                model.adminMode = true;
                adminView.render();
                break;
            case true:
                model.adminMode = false;
                adminView.render();
                break;
        }
    },

    updateCat: function() {
        this.nameInput = document.querySelector('#cat-name').value;
        this.urlInput = document.querySelector('#cat-url').value;
        this.countInput = document.querySelector('#click-count').value;

        model.activeCat.name = this.nameInput;
        model.activeCat.url = this.urlInput;
        model.activeCat.count = this.countInput;

        catListView.render();
        catView.render();
    }
};

//View
var catView = {
    init: function() {
        this.container = document.querySelector('.container');
        this.createTitle = document.createElement('h2');
        this.createImg = document.createElement('img');
        this.createCounter = document.createElement('div');

        this.container.appendChild(this.createTitle).setAttribute('class', 'header-canvas');
        this.container.appendChild(this.createImg).setAttribute('id', 'img-canvas');
        this.container.appendChild(this.createCounter).setAttribute('id', 'counter');

        this.createImg.addEventListener('click', function() {
            octopus.increase();
        })

        this.render();
    },

    render: function() {
        var activeCat = octopus.getActiveCat();
        this.createImg.setAttribute('src', activeCat.url);
        this.createTitle.innerHTML = activeCat.name;
        this.createCounter.innerHTML = activeCat.count;
    }
};

var catListView = {
    
    init: function() {
        this.catList = document.querySelector('.catlist');

        this.render();
    },

    render: function() {
        var cat, listItem;
        var cats = octopus.getCats();

        this.catList.innerHTML = '';

        for(cat of cats) {
            listItem = document.createElement('li');
            listItem.innerHTML = cat.name;

            listItem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setActiveCat(catCopy);
                    catView.render();
                };
            })(cat));

            this.catList.appendChild(listItem);
        }
    }
};

var adminView = {
    init: function() {
        this.button = document.querySelector('.admin-button');

        this.button.addEventListener('click', function() {
            octopus.toggleAdmin();
        });

        this.render();
    },

    render: function() {
        var adminState = octopus.getAdminState();
        var cat = octopus.getActiveCat();
        
        this.area = document.querySelector('.admin-area');
        this.createForm = document.createElement('form');
        this.createNameLabel = document.createElement('label');
        this.createUrlLabel = document.createElement('label');
        this.createCountLabel = document.createElement('label');
        this.createNameInput = document.createElement('input');
        this.createUrlInput = document.createElement('input');
        this.createCountInput = document.createElement('input');
        this.createSubmitButton = document.createElement('button');
        this.createCancelButton = document.createElement('button');


        switch(adminState) {
            case true:
                this.area.appendChild(this.createForm).setAttribute('class', 'admin-form');

                this.createForm.appendChild(this.createNameLabel).innerHTML = 'Cat name:';
                this.createForm.appendChild(this.createNameInput).setAttribute('input', 'text');
                this.createNameInput.setAttribute('id', 'cat-name');
                this.createNameInput.setAttribute('name', 'name');
                this.createNameInput.setAttribute('value', cat.name);

                this.createForm.appendChild(this.createUrlLabel).innerHTML = 'URL:';
                this.createForm.appendChild(this.createUrlInput).setAttribute('input', 'text');
                this.createUrlInput.setAttribute('id', 'cat-url');
                this.createUrlInput.setAttribute('name', 'URL');
                this.createUrlInput.setAttribute('value', cat.url);

                this.createForm.appendChild(this.createCountLabel).innerHTML = 'Click count:'
                this.createForm.appendChild(this.createCountInput).setAttribute('input', 'number');
                this.createCountInput.setAttribute('id', 'click-count');
                this.createCountInput.setAttribute('name','count');
                this.createCountInput.setAttribute('value', cat.count);

                this.area.appendChild(this.createSubmitButton).setAttribute('class', 'submit');
                this.createSubmitButton.innerHTML = 'Submit';

                this.createSubmitButton.addEventListener('click', function() {
                    octopus.updateCat();
                    octopus.toggleAdmin();
                });

                this.area.appendChild(this.createCancelButton).setAttribute('class', 'cancel');
                this.createCancelButton.innerHTML = 'Cancel';

                this.createCancelButton.addEventListener('click', function() {
                    octopus.toggleAdmin();
                });
                break;
            case false:
                this.area.innerHTML = '';
                break;
        };
    }
}

octopus.init();