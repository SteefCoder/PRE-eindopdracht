function create_element(name, options) {
    const element = document.createElement(name);
    Object.assign(element, options);
    return element;
}

function get_input_value(name) {
    let value = document.getElementById(name + "-value").value;
    return Number(value);
}

function set_input_value(name, value) {
    document.getElementById(name + "-value").value = value;
    document.getElementById(name + "-input").value = value;
}

function create_chart(labels, colors) {
    let datasets = [];
    for (let i = 0; i < labels.length; ++i) {
        datasets.push({
            label: labels[i],
            data: [],
            fill: false,
            borderColor: colors[i],
            tension: 0.1
        })
    }

    const ctx = document.getElementById("chart");
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: datasets
        },
        options: {
            aspectRatio: 3,
            responsive: true,
            elements: {
                point: {
                    radius: 0
                }
            },
            plugins: {
                decimation: {
                    enabled: true
                }
            },
            scales: {
                x: {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value, index, ticks) {
                            return Math.round(index * get_input_value("time") / 1000);
                        }
                    },
                    scaleLabel: {
                        display: true
                    }
                },
                y: {
                    ticks: {
                        callback: function(value, index, ticks) {
                            return (100 * value).toFixed(1) + "%";
                            // return;
                        }
                    },
                    scaleLabel: {
                        display: true
                    }
                }
            }
        }
    });
}


function create_input_slider(id, symbol, text, min=0, max=1, step=0.00001) {
    // TODO -- instead make one div in html and then use cloneNode to copy it

    const container = create_element("div", {className: "container"});

    const left = create_element("div", {className: "left"});
    const right = create_element("div", {className: "right"});

    left.appendChild(create_element("h1", {innerText: symbol, style: "display: inline"}))

    const text_div = create_element("div", {
        style: "text-align: center"
    });
    const text_input = create_element("input", {
        id: id + "-value",
        type: "text"
    });
    text_input.onchange = function() {
        set_input_value(id, this.value);
        solve();
    };
    text_div.appendChild(text_input);

    const info_span = create_element("span", {
        innerText: "ⓘ",
        className: "tooltip"
    });

    const tooltip_text = create_element("span", {
        innerHTML: text,
        className: "tooltiptext"
    });

    info_span.appendChild(tooltip_text);

    left.appendChild(document.createTextNode("  "))
    left.appendChild(info_span);

    right.appendChild(text_div);

    const slider_div = create_element("div");

    const slider_input = create_element("input", {
        id: id + "-input",
        type: "range",
        min: min,
        max: max,
        step: step
    });
    slider_input.onchange = function() {
        set_input_value(id, this.value);
        solve();
    };
    slider_div.appendChild(create_element("span", {innerText: min}));
    slider_div.appendChild(slider_input);
    slider_div.appendChild(create_element("span", {innerText: max}));

    right.appendChild(slider_div);

    container.appendChild(left);
    container.appendChild(right);

    const inputs_div = document.getElementById("inputs");

    inputs_div.appendChild(container);
}
