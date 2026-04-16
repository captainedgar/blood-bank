import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  Package, 
  MapPin, 
  BarChart3, 
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  Droplet,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck,
  ChevronRight
} from 'lucide-react';

// Datos mock
const mockData = {
  metrics: [
    { id: 1, label: 'Solicitudes Urgentes', value: 3, color: 'bg-red-500', icon: Droplet },
    { id: 2, label: 'Solicitudes Activas', value: 7, color: 'bg-green-500', icon: FileText },
    { id: 3, label: 'Donantes Hoy', value: 15, color: 'bg-blue-500', icon: Users },
    { id: 4, label: 'Stock Crítico', value: 2, color: 'bg-orange-500', icon: AlertCircle }
  ],
  urgentAlerts: [
    {
      id: '0245',
      bloodType: 'O-',
      hospital: 'Hospital Central',
      urgency: 'ALTA',
      time: '8 minutos'
    }
  ],
  history: [
    { id: '0245', type: 'O-', urgency: 'Alta', status: 'En Proceso', time: '8 min' },
    { id: '0242', type: 'A+', urgency: 'Alta', status: 'Completada', time: '20 min' },
    { id: '0240', type: 'B-', urgency: 'Media', status: 'Pendiente', time: '45 min' }
  ],
  donors: [
    { name: 'Juan Pérez', bloodType: 'A+', status: 'Disponible', statusColor: 'bg-teal-500' },
    { name: 'María Gómez', bloodType: 'O-', status: 'En Camino', statusColor: 'bg-gray-400' },
    { name: 'Carlos Díaz', bloodType: 'B+', status: 'Elegible', statusColor: 'bg-orange-400' }
  ],
  stock: [
    { type: 'A+', percentage: 75, color: 'bg-green-500' },
    { type: 'O-', percentage: 25, color: 'bg-red-500' },
    { type: 'B+', percentage: 40, color: 'bg-yellow-500' },
    { type: 'A-', percentage: 50, color: 'bg-orange-500' }
  ],
  banks: [
    { name: 'Banco Central', lat: 18.486, lng: -69.931 },
    { name: 'Cruz Roja', lat: 18.476, lng: -69.895 },
    { name: 'Salvadores Unidos', lat: 18.468, lng: -69.885 },
    { name: 'Causa Justa', lat: 18.471, lng: -69.910 }
  ]
};

// Componente: Tarjeta de Métrica
const MetricCard = ({ label, value, color, icon: Icon }) => (
  <div className={`${color} rounded-lg p-6 text-white shadow-md`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90 font-medium">{label}</p>
        <p className="text-4xl font-bold mt-2">{value}</p>
      </div>
      <Icon className="w-12 h-12 opacity-80" />
    </div>
  </div>
);

// Componente: Alerta Urgente
const UrgentAlert = ({ alert, onAccept, onReassign }) => (
  <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-4">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-white px-2 py-1 rounded text-sm font-semibold text-gray-700">
            ID: {alert.id}
          </span>
          <span className="text-red-700 font-bold">
            Se necesita {alert.bloodType}
          </span>
        </div>
        <p className="text-gray-700 text-sm mb-2">en {alert.hospital}</p>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-red-600 font-semibold">
            Urgencia: {alert.urgency}
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            Hace {alert.time}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => onAccept(alert.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <CheckCircle className="w-4 h-4" />
          Aceptar
        </button>
        <button 
          onClick={() => onReassign(alert.id)}
          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
        >
          <UserCheck className="w-4 h-4" />
          Reasignar
        </button>
      </div>
    </div>
  </div>
);

// Componente: Tabla de Historial
const HistoryTable = ({ history }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Historial de Solicitudes</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tipo</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Urgencia</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Estado</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-700">{item.id}</td>
              <td className="py-3 px-4">
                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold text-sm ${
                  item.type === 'O-' ? 'bg-red-500' : 
                  item.type === 'A+' ? 'bg-red-600' : 
                  'bg-red-700'
                }`}>
                  {item.type}
                </span>
              </td>
              <td className="py-3 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.urgency === 'Alta' ? 'bg-red-100 text-red-700' : 
                  item.urgency === 'Media' ? 'bg-blue-100 text-blue-700' : 
                  'bg-gray-100 text-gray-700'
                }`}>
                  {item.urgency}
                </span>
              </td>
              <td className="py-3 px-4 text-sm text-gray-700">{item.status}</td>
              <td className="py-3 px-4 text-sm text-gray-500">{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1">
      Ver todas <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

// Componente: Lista de Donantes
const DonorsList = ({ donors }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Donantes Disponibles</h3>
    <div className="space-y-3">
      {donors.map((donor, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-800">{donor.name}</p>
              <p className="text-sm text-gray-500">{donor.bloodType}</p>
            </div>
          </div>
          <span className={`${donor.statusColor} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
            {donor.status}
          </span>
        </div>
      ))}
    </div>
    <button className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1">
      Ver lista <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

// Componente: Estado de Stock
const StockStatus = ({ stock }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Estado de Stock</h3>
    <div className="space-y-4">
      {stock.map((item, index) => (
        <div key={index}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-800">{item.type}</span>
            <span className="text-sm text-gray-500">{item.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`${item.color} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
    <button className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1">
      Ver reporte <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

// Componente: Mapa
const MapView = ({ banks }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="relative h-80 bg-gray-200">
      {/* Simulación de mapa */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full bg-gradient-to-br from-blue-100 to-green-100">
          {banks.map((bank, index) => (
            <div
              key={index}
              className="absolute bg-white rounded-lg shadow-lg px-3 py-2 text-sm font-medium text-gray-700 border-2 border-red-500"
              style={{
                top: `${20 + index * 20}%`,
                left: `${30 + index * 15}%`
              }}
            >
              <MapPin className="w-4 h-4 text-red-500 inline mr-1" />
              {bank.name}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="p-4 bg-gray-50 flex justify-end">
      <button className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1">
        Ver reporte <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Componente: Sidebar
const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'solicitudes', label: 'Solicitudes', icon: FileText },
    { id: 'donantes', label: 'Donantes', icon: Users },
    { id: 'stock', label: 'Stock', icon: Package },
    { id: 'bancos', label: 'Bancos', icon: MapPin },
    { id: 'reportes', label: 'Reportes', icon: BarChart3 }
  ];

  return (
    <div className="bg-red-700 text-white w-64 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-red-600">
        <div className="flex items-center gap-3">
          <Droplet className="w-8 h-8" />
          <span className="text-xl font-bold">Blood Bank</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 hover:bg-red-600 transition-colors ${
                activeSection === item.id ? 'bg-red-800 border-l-4 border-white' : ''
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Configuración */}
      <div className="p-4 border-t border-red-600">
        <button className="w-full flex items-center gap-3 px-6 py-3 hover:bg-red-600 rounded-lg transition-colors">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Configuración</span>
        </button>
      </div>
    </div>
  );
};

// Componente: Header
const Header = () => (
  <header className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Buscador */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Usuario y notificaciones */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Santo Domingo, RD</span>
        </div>
        
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </div>
      </div>
    </div>
  </header>
);

// Componente Principal: Dashboard
const HospitalDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleAccept = (id) => {
    console.log('Aceptar solicitud:', id);
    // Aquí iría la lógica para aceptar
  };

  const handleReassign = (id) => {
    console.log('Reasignar solicitud:', id);
    // Aquí iría la lógica para reasignar
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {mockData.metrics.map((metric) => (
              <MetricCard key={metric.id} {...metric} />
            ))}
          </div>

          {/* Contenido Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna Izquierda - 2/3 del ancho */}
            <div className="lg:col-span-2 space-y-6">
              {/* Alertas Urgentes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Alertas Urgentes</h2>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Menu className="w-5 h-5" />
                  </button>
                </div>
                {mockData.urgentAlerts.map((alert) => (
                  <UrgentAlert 
                    key={alert.id}
                    alert={alert}
                    onAccept={handleAccept}
                    onReassign={handleReassign}
                  />
                ))}
              </div>

              {/* Historial */}
              <HistoryTable history={mockData.history} />

              {/* Mapa */}
              <MapView banks={mockData.banks} />
            </div>

            {/* Columna Derecha - 1/3 del ancho */}
            <div className="space-y-6">
              {/* Donantes */}
              <DonorsList donors={mockData.donors} />

              {/* Stock */}
              <StockStatus stock={mockData.stock} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalDashboard;
