
$(function() {
    describe('RSS Feeds', function() {
  //Test that loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

//Test that loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
        it("URL in allFeeds is not empty", function(){
            allFeeds.forEach(function(elem){
                expect(elem.url).toBeDefined();
                expect(elem.url.length).not.toBe(0);
            })  
        });
        

  
        it("Name in allFeeds is not empty", function(){
            allFeeds.forEach(function(elem){
                expect(elem.name).toBeDefined();
                expect(elem.name.length).not.toBe(0);
            }) 
        })
    });


    
        describe("The menu", function(){
      //Test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
            it("Menu element is hidden by default", function(){
                var test_menu = $("body").hasClass("menu-hidden");
                expect(test_menu).toBe(true);
            });
    //Test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
            it("Menu appears correctly when click", function(){
                spyOnEvent($('.menu-icon-link'), 'click')
                $('.menu-icon-link').click();
                var test_menu = $("body").hasClass("menu-hidden");
                expect(test_menu).not.toBe(true);
                $('.menu-icon-link').click();

            });

            it("Menu disappears when click 2 times", function(){
                spyOnEvent($('.menu-icon-link'), 'click')
                $('.menu-icon-link').click();
                $('.menu-icon-link').click();

                var test_menu = $("body").hasClass("menu-hidden");
                expect(test_menu).toBe(true);
            })
        
        });

        describe("Initial Entries", function(){
      //Test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
            beforeEach(function(done){
                loadFeed("0", function(){
                    done();
                });
            })
            it("loadFeed function is called and complete its work", function(done){
                expect($("div.feed > a").hasClass("entry-link")).toBe(true);
                done();
        })
    });

        describe("New Feed Selection", function(){
        //Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.
        var content1,content2;
            beforeEach(function(done){
                loadFeed("0", function(){
                    content1 = $("div.feed").html();
                    console.log(content1);
                    loadFeed("1", function(){
                        content2 = $("div.feed").html();
                        console.log(content2);
                    })
                    done();
                });
               
            });
            it("Content actually change when newfeed is loaded", function(done){
                expect(content1 != content2).toBe(true);
                done();
            })

    });
}());
