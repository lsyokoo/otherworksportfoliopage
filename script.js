const MAX_SIZE = 700;

const artworks = [
    { src: 'assets/1.jpg', title: 'Anatomy Sketches', description: 'A study of human anatomy in pencil. ' },
    { src: 'assets/2.jpg', title: 'Still Life Sketches', description: 'A study of composition and observation in pencil.' },
    { src: 'assets/3.jpg', title: 'Tiger Painting', description: 'Acrylic on Canvas' },
    { src: 'assets/4.jpg', title: 'Landscape Painting', description: 'Acrylic on Canvas' },
    { src: 'assets/5.jpg', title: 'Lazy Cat', description: 'Chinese Ink painting on rice paper' },
    { src: 'assets/6.jpg', title: 'Anime Fan Art', description: 'Digital Drawing on Procreate' }
];

artworks.forEach((art, i) => {
    const img = new Image();
    img.src = art.src;

    img.onload = function() {
        let width = img.width;
        let height = img.height;

        const scaleRatio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
        width = width * scaleRatio;
        height = height * scaleRatio;

        const svg = d3.select(`#artwork${i + 1}`)
            .attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMidYMid meet');



        svg.append('image')
            .attr('href', art.src)
            .attr('width', '100%')
            .attr('height', '100%');


         const textGroup = svg.append('g')
         .style('opacity', 0);



     textGroup.append('text')
         .attr('x', width / 2)
         .attr('y', height / 2 - 20)  //**** 
         .attr('fill', 'white')
         .attr('font-size', '24px')
         .attr('font-weight', 'bold')

         .attr('text-anchor', 'middle') 
         .attr('dominant-baseline', 'middle') 
         .text(art.title);

 
     textGroup.append('text')
         .attr('x', width / 2)
         .attr('y', height / 2 + 20) 
         .attr('fill', 'white')
         .attr('font-size', '16px')
         .attr('text-anchor', 'middle')
         .attr('dominant-baseline', 'middle')
         .text(art.description);

 


        svg.append("defs")
            .append("filter")
            .attr("id", `blurFilter${i + 1}`)
            .append("feGaussianBlur")
            .attr("stdDeviation", 3);


        svg.select('image').on('mouseover', function() {
            d3.select(this)
              .style("filter", `url(#blurFilter${i + 1})`);
            textGroup.transition()
              .duration(200)
              .style('opacity', 1); 
              
        }).on('mouseout', function() {
            d3.select(this)
              .style("filter", "none");
            textGroup.transition()
              .duration(200)
              .style('opacity', 0); 
        });
    };
});
