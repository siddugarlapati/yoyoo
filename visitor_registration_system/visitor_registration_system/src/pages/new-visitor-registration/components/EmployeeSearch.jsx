import React, { useState, useEffect, useRef } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EmployeeSearch = ({ onEmployeeSelect, selectedEmployee, error }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock employee data - in real app this would come from API
  const mockEmployees = [
    {
      id: 1,
      name: "Sarah Johnson",
      department: "Engineering",
      title: "Senior Software Engineer",
      email: "sarah.johnson@company.com",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      department: "Product Management",
      title: "Product Manager",
      email: "michael.chen@company.com",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      department: "Marketing",
      title: "Marketing Director",
      email: "emily.rodriguez@company.com",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "David Thompson",
      department: "Sales",
      title: "Sales Manager",
      email: "david.thompson@company.com",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 5,
      name: "Lisa Wang",
      department: "Human Resources",
      title: "HR Business Partner",
      email: "lisa.wang@company.com",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg"
    },
    {
      id: 6,
      name: "James Wilson",
      department: "Finance",
      title: "Financial Analyst",
      email: "james.wilson@company.com",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
      id: 7,
      name: "Amanda Davis",
      department: "Operations",
      title: "Operations Manager",
      email: "amanda.davis@company.com",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg"
    },
    {
      id: 8,
      name: "Robert Martinez",
      department: "Engineering",
      title: "DevOps Engineer",
      email: "robert.martinez@company.com",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg"
    }
  ];

  // Debounced search function
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm?.trim()?.length >= 2) {
        searchEmployees(searchTerm);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const searchEmployees = async (query) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const filtered = mockEmployees?.filter(employee =>
      employee?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
      employee?.department?.toLowerCase()?.includes(query?.toLowerCase()) ||
      employee?.title?.toLowerCase()?.includes(query?.toLowerCase())
    );
    
    setSuggestions(filtered);
    setShowSuggestions(true);
    setIsLoading(false);
    setHighlightedIndex(-1);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    
    // Clear selected employee if user is typing
    if (selectedEmployee && value !== selectedEmployee?.name) {
      onEmployeeSelect(null);
    }
  };

  const handleEmployeeSelect = (employee) => {
    setSearchTerm(employee?.name);
    onEmployeeSelect(employee);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions?.length === 0) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions?.length - 1
        );
        break;
      case 'Enter':
        e?.preventDefault();
        if (highlightedIndex >= 0) {
          handleEmployeeSelect(suggestions?.[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
      default:
        break;
    }
  };

  const handleClickOutside = (e) => {
    if (searchRef?.current && !searchRef?.current?.contains(e?.target)) {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set initial search term if employee is already selected
  useEffect(() => {
    if (selectedEmployee && searchTerm !== selectedEmployee?.name) {
      setSearchTerm(selectedEmployee?.name);
    }
  }, [selectedEmployee]);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Input
          label="Host Employee"
          type="text"
          placeholder="Search for your host employee..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          error={error}
          required
          className="w-full"
        />
        
        {/* Search Icon */}
        <div className="absolute right-3 top-9 flex items-center">
          {isLoading ? (
            <Icon name="Loader2" size={16} className="animate-spin text-text-secondary" />
          ) : (
            <Icon name="Search" size={16} className="text-text-secondary" />
          )}
        </div>
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions?.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg max-h-60 overflow-y-auto animate-fade-in"
        >
          {suggestions?.map((employee, index) => (
            <button
              key={employee?.id}
              type="button"
              onClick={() => handleEmployeeSelect(employee)}
              className={`
                w-full px-4 py-3 text-left hover:bg-muted focus:bg-muted focus:outline-none transition-colors duration-150
                ${index === highlightedIndex ? 'bg-muted' : ''}
                ${index === 0 ? 'rounded-t-md' : ''}
                ${index === suggestions?.length - 1 ? 'rounded-b-md' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    src={employee?.avatar}
                    alt={employee?.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-text-primary truncate">
                    {employee?.name}
                  </div>
                  <div className="text-xs text-text-secondary truncate">
                    {employee?.title} • {employee?.department}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Icon name="User" size={14} className="text-text-secondary" />
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      {/* No Results */}
      {showSuggestions && suggestions?.length === 0 && searchTerm?.length >= 2 && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-md shadow-lg p-4 animate-fade-in">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Search" size={16} />
            <span className="text-sm">No employees found for "{searchTerm}"</span>
          </div>
        </div>
      )}
      {/* Selected Employee Display */}
      {selectedEmployee && (
        <div className="mt-2 p-3 bg-success/10 border border-success/20 rounded-md">
          <div className="flex items-center space-x-3">
            <img
              src={selectedEmployee?.avatar}
              alt={selectedEmployee?.name}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-success">
                {selectedEmployee?.name}
              </div>
              <div className="text-xs text-success/80">
                {selectedEmployee?.title} • {selectedEmployee?.department}
              </div>
            </div>
            <Icon name="CheckCircle" size={16} className="text-success" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;