// Project data with codes, images, and descriptions
const projectData = {
  'valve-assembly': {
    title: 'Valve Assembly A-1',
    category: 'Pure Pneumatic',
    code: `// Valve Assembly Control Logic
// Pure Pneumatic System - Non-Electric Regulation

#define VALVE_PIN 8
#define SENSOR_PIN A0
#define PRESSURE_THRESHOLD 50

void setup() {
  Serial.begin(9600);
  pinMode(VALVE_PIN, OUTPUT);
  pinMode(SENSOR_PIN, INPUT);
}

void loop() {
  int pressure = analogRead(SENSOR_PIN);
  
  if (pressure > PRESSURE_THRESHOLD) {
    digitalWrite(VALVE_PIN, HIGH);
    Serial.println("Valve: OPEN");
  } else {
    digitalWrite(VALVE_PIN, LOW);
    Serial.println("Valve: CLOSED");
  }
  
  delay(500);
}`,
    image: './asset/pneumatic/valve-assembly.jpg',
    description: 'Pure pneumatic airflow modulation system for heavy industrial applications. This valve assembly features non-electric regulation mechanisms and is designed for continuous operation in demanding manufacturing environments.'
  },
  'solenoid-piston': {
    title: 'Solenoid Piston',
    category: 'Electro-Pneumatic',
    code: `// Solenoid Piston Controller
// Dual-Action Cylinder with Electro-Pneumatic Solenoids

#define SOLENOID_A 6
#define SOLENOID_B 7
#define SENSOR_A A0
#define SENSOR_B A1

void setup() {
  Serial.begin(9600);
  pinMode(SOLENOID_A, OUTPUT);
  pinMode(SOLENOID_B, OUTPUT);
}

void activateCycleA() {
  digitalWrite(SOLENOID_A, HIGH);
  digitalWrite(SOLENOID_B, LOW);
  delay(1000);
}

void activateCycleB() {
  digitalWrite(SOLENOID_A, LOW);
  digitalWrite(SOLENOID_B, HIGH);
  delay(1000);
}

void loop() {
  activateCycleA();
  activateCycleB();
}`,
    image: './asset/pneumatic/solenoid-piston.jpg',
    description: 'Dual-action cylinder mechanics driven by electro-pneumatic solenoids for rapid industrial cycling. This system enables precise control of pneumatic cylinders with electromagnetic actuation.'
  },
  'airflow-regulator': {
    title: 'Airflow Regulator',
    category: 'Pure Pneumatic',
    code: `// Airflow Regulator Control
// Mechanical Micro-adjustment for Pure Pneumatic

#define PRESSURE_SENSOR A0
#define ADJUSTMENT_POT A1
#define CONTROL_VALVE 5

void setup() {
  Serial.begin(9600);
  pinMode(CONTROL_VALVE, OUTPUT);
}

void loop() {
  int currentPressure = analogRead(PRESSURE_SENSOR);
  int targetPressure = analogRead(ADJUSTMENT_POT);
  
  if (currentPressure < targetPressure) {
    analogWrite(CONTROL_VALVE, 255);
  } else if (currentPressure > targetPressure) {
    analogWrite(CONTROL_VALVE, 0);
  } else {
    analogWrite(CONTROL_VALVE, 127);
  }
  
  Serial.print("Current: ");
  Serial.print(currentPressure);
  Serial.print(" Target: ");
  Serial.println(targetPressure);
  
  delay(100);
}`,
    image: './asset/pneumatic/airflow-regulator.jpg',
    description: 'Mechanical micro-adjustment system for sensitive pure pneumatic environments. This regulator provides fine-grain control over airflow without electronic intervention.'
  },
  'digital-compressor': {
    title: 'Digital Compressor',
    category: 'Electro-Pneumatic',
    code: `// Digital Compressor Monitoring System
// IoT-Integrated Automated Assembly

#include <WiFi.h>
#include <PubSubClient.h>

#define MOTOR_PIN 9
#define PRESSURE_SENSOR A0
#define TEMP_SENSOR A2

const char* ssid = "WORKSHOP_NETWORK";
const char* mqtt_server = "192.168.1.100";

WiFiClient espClient;
PubSubClient client(espClient);

void setupWiFi() {
  WiFi.begin(ssid, "password");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
}

void monitorSystem() {
  int pressure = analogRead(PRESSURE_SENSOR);
  int temperature = analogRead(TEMP_SENSOR);
  
  if (pressure < 100) {
    digitalWrite(MOTOR_PIN, HIGH);
  } else if (pressure > 150) {
    digitalWrite(MOTOR_PIN, LOW);
  }
  
  client.publish("workshop/compressor/pressure", String(pressure).c_str());
  client.publish("workshop/compressor/temp", String(temperature).c_str());
}

void setup() {
  setupWiFi();
  client.setServer(mqtt_server, 1883);
}

void loop() {
  if (!client.connected()) {
    client.connect("CompressorController");
  }
  monitorSystem();
  delay(500);
}`,
    image: './asset/pneumatic/digital-compressor.jpg',
    description: 'Electronically monitored compressor system for automated assembly lines with IoT integration. Provides real-time monitoring and automated pressure management for continuous operation.'
  },
  'control-circuit': {
    title: 'Control Circuit',
    category: 'Electro-Pneumatic',
    code: `// PLC-Compatible Control Circuit
// Logic Control for Electro-Pneumatic Valve Arrays

#define VALVE_1 3
#define VALVE_2 4
#define VALVE_3 5
#define START_BUTTON 2
#define LIMIT_SWITCH_A A0
#define LIMIT_SWITCH_B A1

volatile boolean systemActive = false;
int sequenceStep = 0;

void interruptHandler() {
  systemActive = !systemActive;
}

void executeSequence() {
  switch(sequenceStep) {
    case 0:
      // Extend Cylinder A
      digitalWrite(VALVE_1, HIGH);
      digitalWrite(VALVE_2, LOW);
      break;
    case 1:
      // Extend Cylinder B
      digitalWrite(VALVE_2, HIGH);
      digitalWrite(VALVE_3, LOW);
      break;
    case 2:
      // Retract all
      digitalWrite(VALVE_1, LOW);
      digitalWrite(VALVE_2, LOW);
      digitalWrite(VALVE_3, LOW);
      break;
  }
  sequenceStep = (sequenceStep + 1) % 3;
}

void setup() {
  Serial.begin(9600);
  pinMode(START_BUTTON, INPUT);
  pinMode(VALVE_1, OUTPUT);
  pinMode(VALVE_2, OUTPUT);
  pinMode(VALVE_3, OUTPUT);
  
  attachInterrupt(digitalPinToInterrupt(START_BUTTON), interruptHandler, RISING);
}

void loop() {
  if (systemActive) {
    executeSequence();
    delay(1500);
  } else {
    digitalWrite(VALVE_1, LOW);
    digitalWrite(VALVE_2, LOW);
    digitalWrite(VALVE_3, LOW);
  }
}`,
    image: './asset/pneumatic/control-circuit.jpg',
    description: 'Integrated logic control units for electro-pneumatic valve arrays with PLC compatibility. Enables sequential control and complex valve coordination for automated pneumatic systems.'
  },
  'air-distribution': {
    title: 'Air Distribution',
    category: 'Pure Pneumatic',
    code: `// Air Distribution Network Management
// Multi-Story Manufacturing Facility Infrastructure

#define MAIN_COMPRESSOR 10
#define VALVE_ZONES [4, 5, 6, 7, 8]
#define PRESSURE_ZONES [A0, A1, A2, A3, A4]

const int NUM_ZONES = 5;
const int MIN_PRESSURE = 80;
const int MAX_PRESSURE = 120;

void initializeDistribution() {
  for (int i = 0; i < NUM_ZONES; i++) {
    pinMode(VALVE_ZONES[i], OUTPUT);
    digitalWrite(VALVE_ZONES[i], LOW);
  }
}

void monitorAllZones() {
  for (int i = 0; i < NUM_ZONES; i++) {
    int pressure = analogRead(PRESSURE_ZONES[i]);
    
    if (pressure < MIN_PRESSURE) {
      digitalWrite(VALVE_ZONES[i], HIGH);
      Serial.print("Zone ");
      Serial.print(i);
      Serial.println(": OPENING VALVE");
    } else if (pressure > MAX_PRESSURE) {
      digitalWrite(VALVE_ZONES[i], LOW);
      Serial.print("Zone ");
      Serial.print(i);
      Serial.println(": CLOSING VALVE");
    }
  }
}

void setup() {
  Serial.begin(9600);
  initializeDistribution();
  pinMode(MAIN_COMPRESSOR, OUTPUT);
}

void loop() {
  digitalWrite(MAIN_COMPRESSOR, HIGH); // Main pump always on
  monitorAllZones();
  delay(1000);
}`,
    image: './asset/pneumatic/air-distribution.jpg',
    description: 'Pure pneumatic distribution infrastructure designed for multi-story manufacturing facilities. Manages airflow across multiple zones with individual pressure regulation.'
  }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
  // Make cards clickable for detailed view
  const cards = document.querySelectorAll('[data-project]');
  cards.forEach(card => {
    card.addEventListener('click', function () {
      const projectId = this.getAttribute('data-project');
      showProjectDetail(projectId);
    });
  });

  // Filter functionality
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remove active classes
      filterBtns.forEach(b => {
        b.classList.remove('bg-chrome', 'text-black');
        b.classList.add('bg-card-dark', 'text-gray-400');
      });

      // Add active class to clicked button
      this.classList.remove('bg-card-dark', 'text-gray-400');
      this.classList.add('bg-chrome', 'text-black');

      const filterValue = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Optional: reset animation to replay fade-in
          card.style.animation = 'none';
          card.offsetHeight; /* trigger reflow */
          card.style.animation = null;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Close button functionality (backup - primary is through <a> tag)
  const closeBtn = document.querySelector('[aria-label="Close and return to workshop"]');
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'index.html#workshop';
    });
  }
});

// Show detailed project view
function showProjectDetail(projectId) {
  const project = projectData[projectId];
  console.log('Project selected:', project.title);

  // Create modal or navigate to detail page
  // You can expand this to show code, images, and full descriptions
  alert(`${project.title}\n\n${project.description}\n\nFull code and schematic view coming soon!`);
}

// Function to navigate to detail page
function navigateToDetail(projectId) {
  window.location.href = `pneumatics-detail.html?project=${projectId}`;
}
