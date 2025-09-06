def get_career_info(career_names):
    career_data = {
        "Bioinformatics Specialist / Environmental Data Analyst": {
            "careerDescription": "Analyze biological or environmental data using computational techniques. Useful in climate research, conservation, and health informatics.",
            "careerOpportunities": "Research institutions, Biotech firms, Environmental NGOs",
            "slMonthlySalary": "80,000 – 160,000",
            "slLocation": "Colombo, Kandy",
            "foreignMonthlySalary": "3,200 – 6,000",
            "foreignLocation": "USA, Germany, Canada",
            "workType": "Lab / Remote / Field"
        },
        # ✅ Add more careers here as needed
    }

    return [career_data.get(name, {}) for name in career_names]