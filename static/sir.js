// uses base.js

var chart;


function solve_SIR_progression(
    transmission_rate,
    recovery_rate,
    time
) {
    const steps = 1000;
    let step_size = time / steps;

    let S = 1 - 3e-6; // susceptible
    let I = 3e-6;     // infected
    let R = 0;        // recovered
    
    let dS, dI, dR;
    for (let i = 0; i < steps; ++i) {
        dS = -transmission_rate * S * I;
        dI = transmission_rate * S * I - recovery_rate * I;
        dR = recovery_rate * I;
        
        S += step_size * dS;
        I += step_size * dI;
        R += step_size * dR;

        chart.data.labels[i] = i * step_size;
        chart.data.datasets[0].data[i] = S;
        chart.data.datasets[1].data[i] = I;
        chart.data.datasets[2].data[i] = R;
    }

    chart.update();
}

function solve() {
    solve_SIR_progression(
        get_input_value("transmission"),
        get_input_value("recovery"),
        get_input_value("time")
    );
}

function set_defaults() {
    set_input_value("transmission", 0.5);
    set_input_value("recovery", 0.15);
    set_input_value("time", 100);
}

window.onload = () => {
    chart = create_chart(
        ["Vatbaar", "Geïnfecteerd", "Hersteld"],
        ["yellow", "red", "green"]
    )

    create_input_slider("time", "t", "Tijd vooruit kijken (jaren)", 1, 100, 1);
    create_input_slider("transmission", "β", "Verspreidingssnelheid");
    create_input_slider("recovery", "γ", "Herstelsnelheid");

    set_defaults();
    solve();
};