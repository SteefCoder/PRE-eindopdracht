// uses base.js

var chart;


function solve_SLIT_progression(
    eta, r1, r2, phi, k, time
) {

    // eta - infection rate
    // r1 - recovery rate for latent group
    // r2 - recovery rate for infected
    // phi - treated patients becoming latent
    // k - latent patients becoming infected
    const steps = 1000;
    let step_size = time / steps;

    let S = 0.9547;  // susceptible
    let L = 0.025;    // latent
    let I = 0.0032;   // infected
    let T = 0.0171;   // recovered
    
    let dS, dL, dI, dT;
    for (let i = 0; i < steps; ++i) {
        dS = -eta * S * I;
        dL = eta * S * I - (k + r1) * L + phi * T;
        dI = k * L - r2 * I;
        dT = r1 * L + r2 * I - phi * T;

        S += step_size * dS;
        L += step_size * dL;
        I += step_size * dI;
        T += step_size * dT;

        chart.data.labels[i] = i * step_size;
        chart.data.datasets[0].data[i] = S;
        chart.data.datasets[1].data[i] = L;
        chart.data.datasets[2].data[i] = I;
        chart.data.datasets[3].data[i] = T;
    }
    chart.update();
}

function solve() {
    solve_SLIT_progression(
        get_input_value("eta"),
        get_input_value("r1"),
        get_input_value("r2"),
        get_input_value("phi"),
        get_input_value("k"),
        get_input_value("time")
    );
}

function set_defaults() {
    set_input_value("eta", 0.00003);
    set_input_value("r1", 0.0001);
    set_input_value("r2", 0.595);
    set_input_value("phi", 0.00003);
    set_input_value("k", 0.0825);
    set_input_value("time", 50);
}

window.onload = () => {
    chart = create_chart(
        ['Vatbaar', 'Niet-besmettelijke tbc', 'Besmettelijke tbc', 'Genezen'],
        ['yellow', 'orange', 'red', 'green']
    );

    create_input_slider("time", "t", "De tijd om vooruit te kijken in jaren", 1, 100, 1);
    create_input_slider("eta", "η", "Het deel van de vatbare groep dat per jaar wordt geïnfecteerd met tbc. In India is dit ongeveer 0.003% van de bevolking, oftwel zo'n 42 duizend mensen per jaar.");
    create_input_slider("phi", "ϕ", "Het deel van de genezen groep dat per jaar wordt geïnfecteerd. Dit percentage is hetzelfde als bij de vatbare groep, omdat tbc geen immuniteit geeft na genezing.");
    create_input_slider("r1", "r1", "Het deel van de groep met niet-besmettelijke tbc dat per jaar geneest. Dit is in India slechts 0.01% omdat niet-besmettelijke tbc ook geen symptomen heeft en dus vaak niet wordt opgemerkt.");
    create_input_slider("r2", "r2", "Het deel van de groep met besmettelijke tbc dat per jaar geneest. In India wordt per jaar bijna 60% van de mensen met tbc genezen. De overlijdenskans wordt bij dit model niet meegerekend.");
    create_input_slider("k", "k", "Het deel van de groep met niet-besmettelijke tbc dat per jaar symptomen krijgt en dus besmettelijk wordt. Dat is zo'n 8.3% van de mensen met niet-besmettelijke tbc per jaar. Ongeveer 2.5% van de bevolking in India heeft tbc in de niet-besmettelijke vorm, terwijl maar 0.32% besmettelijke tbc heeft.");
    set_defaults();

    solve();
}